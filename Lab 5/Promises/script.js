function getNewPromise(value, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(value);
        }, delay);
    });
}

getNewPromise("This is Lab 5", 2000)
    .then(result => {
        let paragraph = document.createElement("p");
        paragraph.textContent = result;
        document.body.appendChild(paragraph);
    });

getNewPromise("This is a promise", 4000)
      .then(result => result.toUpperCase())
      .then(result => result.split('').reverse().join(''))
      .then(result => {
        let paragraph = document.createElement("p");
        paragraph.textContent = result;
        document.body.appendChild(paragraph);
      });

getNewPromise(42, 3000)
    .then(result => result * 2)
    .then(result => {
        getNewPromise(result + 16, 1000)
            .then(result => console.log("Nested result: ", result))
            .catch((e) => { });

        return result;
    })
    .then(result => {
        throw new Error("Something went wrong");
        console.log("Final result: ", result * -1);
    })
    .catch((e) => console.error("Failed: ", e.message));