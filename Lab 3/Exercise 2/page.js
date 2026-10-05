let newH1Element = document.createElement("h1");
let heading = document.createTextNode("In Brief");
newH1Element.appendChild(heading);
document.body.appendChild(newH1Element);

let newParagraphElement = document.createElement("p");
let paragraphText = document.createTextNode("This is a very short page. It includes some text, an image and a list");
newParagraphElement.appendChild(paragraphText);
document.body.appendChild(newParagraphElement);

let newImageElement = document.createElement("img");
newImageElement.src = "https://jelena-vk-itt.github.io/jvk-tudt-notes/rwat/res/images/logo.png";
newImageElement.alt = "Logo";
document.body.appendChild(newImageElement);

let newH2Element = document.createElement("h2");
let subheading = document.createTextNode("TODO");
newH2Element.appendChild(subheading);
document.body.appendChild(newH2Element);

let newListElement = document.createElement("ul");
let listItem1 = document.createElement("li");
let listItemText1 = document.createTextNode("finish lab");
listItem1.appendChild(listItemText1);
newListElement.appendChild(listItem1);

let listItem2 = document.createElement("li");
let listItemText2 = document.createTextNode("practice");
listItem2.appendChild(listItemText2);
newListElement.appendChild(listItem2);

let listItem3 = document.createElement("li");
let listItemText3 = document.createTextNode("practice some more");
listItem3.appendChild(listItemText3);
newListElement.appendChild(listItem3);

document.body.appendChild(newListElement);