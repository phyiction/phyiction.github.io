+++
draft = false
modified = '2023-02-04T07:56-06:00'
published = '2023-02-04T07:41:58-06:00'
tags = ['Bootstrap','JavaScript','React','software']
summary = """
A static web app that allows you to take multiple choice assessments.
"""
title = 'Assessments Web App'
+++

# Background
While being a part of Engage JXN at [We Will Go](https://www.wewillgo.org/) 
between August 2022 and May 2023 I took two assessments to better understand 
how I operate. I developed this static web app to allow users to take the 
assessments multiple times without having to manually compute the results. 

# Design Decisions
The results of the assessment are stored in the web browser you used to take it. 
This maximizes privacy in the sense data associated with the assesments are 
stored on your device and not in some remote database. However, 
this design choice also has a huge drawback, namely you cannot continue the 
assessment from a different device. 

# Demo
You can take the assessments [here](/projects/assess-app) and find the source
code on [GitHub](https://github.com/phyiction/assess-app).