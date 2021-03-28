'use strict';

//create a list of the images names
const imgNames = [
  'banana',
  'bag',
  'bathroom',
  'boots',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors'
];

//get the images elements
const imagesContainer = document.getElementById('imagesContainer');
const image1 = document.getElementById('img1');
const image2 = document.getElementById('img2');
const image3 = document.getElementById('img3');

let imageIndex =[];
const rounds = 5;
let counterRounds = 0;

//create random function
function randomNum(min,max,length,repeatedAllowed) //length:is how many random numbers you want , repeatedAllowed is do you want to allow repeated number or only uniqe (true or false)
{
  let randomNumbers = [];
  let number = 0;
  let posiible = 1; //this to hold a value I will check on it to see if it's possible to not repeat numbers somI will not enter infinite loop
  if(max-min < length) //to check if it's possible to not repeat the numbers
    posiible=0;

  for(let i = 0; i<length ; i++)
  {
    number = Math.floor(Math.random()*(max-min)+min);
    // randomNumbers.push(number);
    console.log('index is ', randomNumbers.indexOf(number));
    if(posiible && !repeatedAllowed && randomNumbers.indexOf(number)===-1)

      randomNumbers.push(number);

    else if(posiible && !repeatedAllowed)
      i--;
    else
      randomNumbers.push(number);
  }
  return randomNumbers;
}

//create a constructor for the images slide show
function SlideShow(imageName)
{
  this.imageName = imageName;
  this.path = `../images/${this.imageName}.jpg`;
  this.votes = 0;
  this.views = 0;
  SlideShow.all.push(this);

}
SlideShow.all = [];


//create objects for the images
for(let i = 0 ; i<imgNames.length ; i++)
{
  new SlideShow(imgNames[i]);
}

console.table(SlideShow.all);
// console.log(randomNum(5,12,4,false));

//to show the images on the page
function render()
{
  imageIndex = randomNum(0,imgNames.length-1,3,false);
  image1.src = SlideShow.all[imageIndex[0]].path;
  SlideShow.all[imageIndex[0]].views ++;
  image2.src = SlideShow.all[imageIndex[1]].path;
  SlideShow.all[imageIndex[1]].views ++;
  image3.src = SlideShow.all[imageIndex[2]].path;
  SlideShow.all[imageIndex[2]].views ++;
  // console.log(imageIndex);
  // counterRounds++;
}

render();

//to change go to traffic function and change the data each time the user click on an inage
image1.addEventListener('click', function(){trafiic(1);});
image2.addEventListener('click', function(){trafiic(2);});
image3.addEventListener('click', function(){trafiic(3);});

//to increment the votes by one each time the user click on an image
function trafiic(x)
{
  // counterRounds++;
  if(counterRounds<rounds)
  {
    SlideShow.all[imageIndex[x-1]].votes ++ ;
    render();
    // if(counterRounds === rounds )
    // {
    //   // createTable();
    //   console.log('it entered the if ' , SlideShow.all);
    // }
  }
  counterRounds++;
  if(counterRounds === rounds )
  {
    // createTable();
    // createList();
    // console.log('it entered the if ' , SlideShow.all);
    document.getElementById('showResultBtn').style.display = 'block';
  }
  
}

// if(counterRounds === rounds )
// {
//   console.table(SlideShow.all);
// }

// let tableHeader = ['Name', 'Views', 'Votes'];
// function createTable()
// {
//   const tableEl = document.createElement('table');
//   document.getElementById('footer').appendChild(tableEl);
//   for(let r = 0 ; r <= SlideShow.all.length ; r++ )
//   {
//     let data = [];
//     if(r!==0) //to skip the header row
//       data = [SlideShow.all[r-1].imageName, SlideShow.all[r-1].views, SlideShow.all[r-1].votes]; //I put the value in array so I can loop them in the inner for , so I won't need to repeat the creating table data

//     const trEl = document.createElement('tr');
//     tableEl.appendChild(trEl);
//     for(let c = 0; c < 3 ; c++)
//     {
//       if(r===0)
//       {
//         const thEl = document.createElement('th');
//         trEl.appendChild(thEl);
//         thEl.textContent = tableHeader[c];
//       }
//       else
//       {
//         const tdEl = document.createElement('td');
//         trEl.appendChild(tdEl);
//         tdEl.textContent = data[c];
//       }
//     }
//   }

// }


// console.log(SlideShow.all[0]);
let btnClicked = 0;
document.getElementById('showResultBtn').addEventListener('click', createList);
function createList()
{
  if(btnClicked>0)
    return ;
  const ulEl = document.createElement('ul');
  document.getElementById('footer').appendChild(ulEl);
  for(let i =0 ; i<SlideShow.all.length ; i++)
  {
    const liEl = document.createElement('li');
    ulEl.appendChild(liEl);
    liEl.textContent = `${SlideShow.all[i].imageName} had ${SlideShow.all[i].votes} votes, and was seen ${SlideShow.all[i].views} times`;
  }
  btnClicked++;
}
