function showInfo()
{
	var para = document.createElement("h4");
	para.id = "h";
	var node = document.createTextNode("By Avram Mihai - Adrian");
	para.appendChild(node);
	var element = document.getElementById("demo");
	element.appendChild(para);
}
function hideInfo()
{
	var parent = document.getElementById("demo");
	var child = document.getElementById("h");
	parent.removeChild(child);
}