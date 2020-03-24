import csv
import os
import shutil

#Michael Tata
#3/17/2020

#[field "oci"] the Open Citation Identifier (OCI) for the citation;																										UNNEEDED
#[field "citing"] the DOI of the citing entity;																															NEEDED
#[field "cited"] the DOI of the cited entity;																															NEEDED
#[field "creation"] the creation date of the citation (i.e. the publication date of the citing entity);																	OPTIONAL
#[field "timespan"] the time span of the citation (i.e. the interval between the publication date of the cited entity and the publication date of the citing entity);	UNNEEDED
#[field "journal_sc"] it records whether the citation is a journal self-citations (i.e. the citing and the cited entities are published in the same journal);			OPTIONAL
#[field "author_sc"] it records whether the citation is an author self-citation (i.e. the citing and the cited entities have at least one author in common).			OPTIONAL


#
# A basic container class for citation data
class CitationInfo:
	
	def __init__(self, selfdoi):
	
		self.doi = selfdoi
		
		# References made by the DOI given. References and referencesdate correspond to each other at each index
		self.references = []
		self.referencesdate = []
		
		
		# Citations of the DOI by other articles. citedby and citedbydate correspond to each other at each index
		self.citedby = []
		self.citedbydate = []
		
		
		
#
#	Compilation class that handles the parsing of the CSV files 
#	and organizing of them into a dictionary.(Dictionary is formatted where the doi is the key, and the value is a CitationInfo container	
class CitationCompiler:

	def __init__(self, dir):
	
		self.directory = dir
		self.citations = {}
		


	#NOTE: Citing is the one doing the citing, AKA Referencing
	#Cited is the one being cited.
	
	#Function that begins compiling all citation information. doi_list is a list of all doi's that we are keeping track of.
	#So all doi present in the database
	def compile_citation_csv(self, doi_list):
		
		#Only save citation information for articles with DOI's that we have. 
		for val in doi_list:
			self.citations[val] = CitationInfo(val)
		

		totalcount = 0
		totalfound = 0
	
		for subdir, dirs, files in os.walk(self.directory):
			for file in files:
				if file.endswith(".csv"):
					print("\nOpening file ", file)
					csvfile = open(os.path.join(subdir, file), encoding='utf-8', errors='ignore')
					reader = csv.DictReader(csvfile)
					rowcount = 0
					foundcount = 0
				
					for row in reader:

						citing = row['citing'] 
						cited = row['cited']
						date = row['creation']
						span = row['timespan']
					
					
						if cited in self.citations and citing in self.citations:
						
							self.citations[cited].citedby.append(citing)
							self.citations[cited].citedbydate.append(date)
						
							self.citations[citing].references.append(cited)
							self.citations[citing].referencesdate.append(date)		#######
						
							foundcount = foundcount + 1
					
							
						elif citing in self.citations:
								
							self.citations[citing].references.append(cited)
							self.citations[citing].referencesdate.append(date)			############
												
							foundcount = foundcount + 1
						
						
						elif cited in self.citations:
					
							self.citations[cited].citedby.append(citing)
							self.citations[cited].citedbydate.append(date)
						
							foundcount = foundcount + 1
					
						rowcount = rowcount + 1
					
				#print("ROWS PARSED:", rowcount)
				#print("ROWS FOUND:", foundcount)
			
				totalcount = totalcount + rowcount
				totalfound = totalfound + foundcount 
		
		#print("TOTAL ROWS PARSED:", totalcount)
		print("TOTAL MATCH COUNT:", totalfound)
	
		
	
		
		#return self.citations
	

# 
# Takes in a list of DOI values(Strings)
#
# Returns a dictionary where the key is the DOI(string), and the value is a CitationInfo Object. 
def get_citation_data(doidata):
	
	filepath = "./"
	
	cc = CitationCompiler(filepath)
	
	cc.compile_citation_csv(doidata)

	return cc.citations


	
#
#Testing Space
#
#temp = ["10.2478/amcs-2019-0013", "10.17509/jsl.v2i2.16204", "10.1177/2382120519827890", "10.3389/fnsys.2019.00016", "10.3390/s19051166", "10.5194/hess-6-39-2002", "10.5194/hess-7-652-2003"]

#cits = get_citation_data(temp)

#for key, val in cits.items():
				
#			print("\n\nDOI:", key)
				
#			print("Cited - Date Cited")
#			for i in range(len(val.references)):
#				print(val.references[i] ," - ", val.referencesdate[i])
#			
#			print("Cited By - Date Cited")
#			for i in range(len(val.citedby)):
#				print(val.citedby[i], " - ", val.citedbydate[i])

	
#			print("\nREFERENCE COUNT:", len(val.references))
#			print("CITED BY COUNT:", len(val.citedby))


