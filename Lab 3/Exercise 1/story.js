//Create a heading for the story
let newH1Element = document.createElement("h1");
newH1Element.textContent = "Little Red Riding Hood";

let paragraphElements = document.getElementsByTagName('p');
let firstParagraph = paragraphElements[0];
firstParagraph.parentElement.insertBefore(newH1Element, firstParagraph);

//Remove incorrect paragraph
let badParagraph = paragraphElements[3];
badParagraph.parentElement.removeChild(badParagraph);

//Swap paragraphs in wrong order
let sixthParagraph = paragraphElements[5];
let seventhParagraph = paragraphElements[6];

seventhParagraph.parentElement.insertBefore(seventhParagraph, sixthParagraph);

//Replace The End paragraph
let newEndingParagraph = document.createElement('p');
newEndingParagraph.appendChild(document.createTextNode('However, the good hunter was passing by and heard what was happening. He was able to cut open the wolf and save both girl and granny.'));

let article = document.body.children[0];

let indexOfLastArticleElement = article.children.length - 1;
let lastParagraph = article.children[indexOfLastArticleElement];

article.replaceChild(newEndingParagraph, lastParagraph);
