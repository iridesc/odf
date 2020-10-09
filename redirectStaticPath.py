with open('./dist/index.html','r') as f:
    text=f.read()
text=text.replace('href=/','href=/static/')
# print(text)
text=text.replace('src=/','src=/static/')
# print(text)
with open('./dist/index.html','w') as f:
    f.write(text)
print('redirect done!')