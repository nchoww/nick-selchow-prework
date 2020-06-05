const studentNames = ['Nick', 'Michael', 'Chris']

for (let i = 0; i < 3; i++) {
	const newName = prompt('Enter a name');
	studentNames.push(newName);
}

for (i = 0; i < studentNames.length; i++) {
	console.log(studentNames[i]);
}