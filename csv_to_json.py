import csv
import os.path
import string
import json

if __name__ == '__main__':


	input_filename = "comments.csv"
	
	csv_infile = open(input_filename, 'r')
	output_filename = "comments.json"

	comment_obj = {"comments": []}

	reader = csv.DictReader(csv_infile)


	for row in reader:
		#print row
		comment_obj["comments"].append({"ID": row["ID"], "comment": row["Comment"], \
			"rubric": row["Rubric"], "length": row["Length"], "category": row["Category"], \
			"frequency": row["Frequency"], "blank values": row["Blank values"]})

	outfile = open(output_filename, 'wb')
	json.dump(comment_obj, outfile)
