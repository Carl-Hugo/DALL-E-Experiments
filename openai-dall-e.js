import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const defaultNumberOfImageToGenerate = 4;
const defaultPrompt = 'a large white sci-fi spaceship with detailed metal panels in space';

async function createDALL_E(imgElement, prompt, size, numberOfImageToGenerate = defaultNumberOfImageToGenerate) {
    const response = await openai.createImage({
        prompt: prompt,
        n: numberOfImageToGenerate,
        size: size,
    });
    console.debug(response);
    dispayImages(imgElement, response.data.data);
}
async function variationDALL_E(imgElement, previousImage, size, numberOfImageToGenerate = defaultNumberOfImageToGenerate) {
    const response = await openai.createImageVariation(previousImage, numberOfImageToGenerate, size);
    console.debug(response);
    dispayImages(imgElement, response.data.data);
}

async function editDALL_E(imgElement, originalImage, mask, prompt, size, numberOfImageToGenerate = defaultNumberOfImageToGenerate) {
    const response = await openai.createImageEdit(originalImage, mask, prompt, numberOfImageToGenerate, size);
    console.debug(response);
    dispayImages(imgElement, response.data.data);
}

export function setupDALL_E(element) {
    var imageContainerElement = document.createElement('div');
    var previewElement = document.createElement('img');
    previewElement.className = 'preview';

    var variationUploadElement = document.createElement('input');
    variationUploadElement.type = 'file';
    variationUploadElement.addEventListener('change', changeFile);

    var createTextElement = document.createElement('input');
    createTextElement.type = 'text';
    createTextElement.value = defaultPrompt;

    var createSizeElement = sizeSelect();
    var variationSizeElement = sizeSelect();
    var editSizeElement = sizeSelect();

    var createButtonElement = document.createElement('button');
    createButtonElement.innerText = 'Create';
    createButtonElement.addEventListener('click', () =>
        createDALL_E(imageContainerElement, createTextElement.value, createSizeElement.value)
    );

    var variationButtonElement = document.createElement('button');
    variationButtonElement.innerText = 'Variation';
    variationButtonElement.disabled = true;
    variationButtonElement.addEventListener('click', () =>
        variationDALL_E(imageContainerElement, variationUploadElement.files[0], variationSizeElement.value)
    );

    var editUploadElement = document.createElement('input');
    editUploadElement.type = 'file';

    var editUploadMaskElement = document.createElement('input');
    editUploadMaskElement.type = 'file';

    var editTextElement = document.createElement('input');
    editTextElement.type = 'text';
    editTextElement.value = 'a large white sci-fi triangle-shaped spaceship in space';

    var editButtonElement = document.createElement('button');
    editButtonElement.innerText = 'Edit';
    editButtonElement.disabled = true;
    editButtonElement.addEventListener('click', () =>
        editDALL_E(
            imageContainerElement,
            editUploadElement.files[0],
            editUploadMaskElement.files[0],
            editTextElement.value,
            editSizeElement.value
        )
    );

    element.appendChild(heading('DALL·E Experiments', 'h1'));
    element.appendChild(hr());
    element.appendChild(heading('result'));
    element.appendChild(imageContainerElement);
    element.appendChild(hr());
    element.appendChild(heading('create'));
    element.appendChild(createTextElement);
    element.appendChild(createSizeElement);
    element.appendChild(createButtonElement);

    element.appendChild(hr());
    element.appendChild(heading('variation'));
    element.appendChild(variationSizeElement);
    element.appendChild(variationUploadElement);
    element.appendChild(variationButtonElement);
    element.appendChild(br());
    element.appendChild(previewElement);

    element.appendChild(hr());
    element.appendChild(heading('Edit'));
    element.appendChild(label('Image'));
    element.appendChild(editUploadElement);
    element.appendChild(label('Mask'));
    element.appendChild(editUploadMaskElement);
    element.appendChild(editSizeElement);
    element.appendChild(editTextElement);
    element.appendChild(editButtonElement);

    element.appendChild(hr());

    function changeFile() {
        var file = variationUploadElement.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            previewElement.src = e.target.result;
        };
        reader.readAsDataURL(file);
        variationButtonElement.disabled = false;
    }
}

function heading(text, tagName = 'h2') {
    var h = document.createElement(tagName);
    h.innerText = text;
    return h;
}

function sizeSelect() {
    var select = document.createElement('select');
    select.appendChild(createOption('256x256'));
    select.appendChild(createOption('512x512'));
    select.appendChild(createOption('1024x1024'));
    return select;

    function createOption(text) {
        var option = document.createElement('option');
        option.value = text;
        option.innerText = text;
        return option;
    }
}

function hr() {
    return document.createElement('hr');
}

function br() {
    return document.createElement('br');
}

function label(text) {
    var label = document.createElement('label');
    label.innerText = text;
    return label;
}

function img(src) {
    var imageElement = document.createElement('img');
    imageElement.src = src;
    return imageElement;
}

function appendImage(parentElement, src) {
    parentElement.appendChild(img(src));
}

function dispayImages(parentElement, data) {
    parentElement.innerHTML = '';
    data.forEach((element) => appendImage(parentElement, element.url));
}

window.listFiles = async function () {
    const response = await openai.listFiles();
    console.log(response);
};

// Fix an Axios bug
FormData.prototype.getHeaders = () => {
    return { 'Content-Type': 'multipart/form-data' };
};
