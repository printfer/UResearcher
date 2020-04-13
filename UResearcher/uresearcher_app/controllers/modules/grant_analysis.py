## Author: Christopher Liu
## Date of Creation: 2/10/20

## Warning: The xml module is not secure against malicious data.

## Imported Libraries
import xml.etree.ElementTree as ET
import re
import urllib.request
import os
# import grant_analysis_db_functions
from datetime import datetime
from zipfile import *


def read_xml(document_name, cutoff_date):
	## Opening and analyzing the xml file
	Grant_Tree = ET.parse(document_name)																					## 1
	root = Grant_Tree.getroot()																								## 1

	## Iterating over points with relevant tags
	result = {}					
	for child in root.findall('{http://apply.grants.gov/system/OpportunityDetail-V1.0}OpportunitySynopsisDetail_1_0'):		## 1
		
		## Fetching information
		temp = {}
		title = child.find('{http://apply.grants.gov/system/OpportunityDetail-V1.0}OpportunityTitle')						## 1
		post = child.find('{http://apply.grants.gov/system/OpportunityDetail-V1.0}PostDate')  						 		## 1
		description = child.find('{http://apply.grants.gov/system/OpportunityDetail-V1.0}Description')						## 1
		ceiling = child.find('{http://apply.grants.gov/system/OpportunityDetail-V1.0}AwardCeiling')							## 1
		floor = child.find('{http://apply.grants.gov/system/OpportunityDetail-V1.0}AwardFloor')								## 1
		total = child.find('{http://apply.grants.gov/system/OpportunityDetail-V1.0}EstimatedTotalProgramFunding')			## 1
		close = child.find('{http://apply.grants.gov/system/OpportunityDetail-V1.0}CloseDate')
		category = child.find('{http://apply.grants.gov/system/OpportunityDetail-V1.0}OpportunityCategory')

		## Converting post time to unix
		time = datetime.strptime(post.text, '%m%d%Y')

		## Recording the grant if it beyond the cutoff date
		if (time > cutoff_date):

			## Contructing the data point
			if description != None:
				temp['Description'] = description.text
			else:
				temp['Description'] = ""
			if ceiling != None:
				temp['Ceiling'] = int(ceiling.text)
			if ceiling != None:
				temp['Ceiling'] = int(ceiling.text)
			else:
				temp['Ceiling'] = 0
			if floor != None:
				temp['Floor'] = int(floor.text)
			else:
				temp['Floor'] = 0
			if total != None:
				temp['Total'] = int(total.text)
			else:
				temp['Total'] = 0
			if close != None:
				temp['Close'] = (datetime.strptime(close.text, '%m%d%Y')-datetime.min).days
			else:
				temp['Close'] = None
			if category != None:
				temp['Category'] = category.text
			else:
				temp['Category'] = 'Undefined'
			temp['Post'] = (time-datetime.min).days
			

			result[title.text] = temp

	return result


def download_grant_info(date):

	urllib.request.urlretrieve("https://www.grants.gov/extract/GrantsDBExtract" + date + "v2.zip", date + ".zip")
	with ZipFile(date + ".zip", "r") as Zip_Obj:
		## Creates a file in the form of "GrantsDBExtract" + "year" + "month" + "day" + "v2.zip"
		Zip_Obj.extractall()
	os.remove(date + ".zip")


def grant_update(cutoff_date):

	current_date = datetime.now().strftime("%Y%m%d")
	download_grant_info(current_date)
	doc = "GrantsDBExtract" + current_date + "v2.xml"
	result = read_xml(doc, cutoff_date)
	os.remove(doc)
	return result


def daily_update():

	d = datetime.today()
	d_new = (datetime(d.year, d.month, d.day - 1))
	return grant_update(d_new)


def complete_update():
	
	return grant_update(datetime.min)


def get_grant_data_points(grants):

	result_floor = {}
	result_ceil = {}

	for grant in grants:
		date =  grant["date"]
		close = grant["close"]
		floor = grant["floor"]
		ceil = grant["ceiling"]

		if close == None:
			close = date

		while(date <= close):

			
			if date in result_floor:
				result_floor[date] += floor
			elif date != None:
				result_floor[date] = floor

			
			if date in result_ceil:
				result_ceil[date] += ceil
			elif date != None:
				result_ceil[date] = ceil

			date += 1

	return result_floor, result_ceil


def sort_by_date_key(dates_by_value):
	return dates_by_value[0]


def complete_analysis(data):

	floors, ceilings = get_grant_data_points(data)

	# begin to convert data to desired return type
	ret_floors = []
	for k, v in floors.items():
		 # convert to unix timestamp for simplicity
		ret_floors += [[k, v]]

	ret_ceils = []
	for k, v in ceilings.items():
		ret_ceils += [[k, v]]

	## Sorting by Date
	ret_floors = sorted(ret_floors, key = sort_by_date_key)
	ret_ceils = sorted(ret_ceils, key = sort_by_date_key)

	## FINAL RETURN TYPE NEEDS TO BE IN THIS FORMAT
	ret_floors = [{'x': p[0], 'y': p[1]} for p in ret_floors]
	ret_ceils = [{'x': p[0], 'y': p[1]} for p in ret_ceils]

	return ret_floors, ret_ceils


## Executable Definition for Testing
def main():
	print((datetime.now()-datetime.min).days)


if __name__ == "__main__":
    main()

## Citations:
##
## 	1. https://docs.python.org/2/library/xml.etree.elementtree.html
##
##     Date Accessed: 1/16/20
##
##  2. https://stackabuse.com/download-files-with-python/
##
##	   Date Accessed: 2/11/20
