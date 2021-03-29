'use strict';

//create a list of the images names
const imgNames = [
  'banana', //imgNames[0]
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
  'scissors',
  'shark',
  'tauntaun'
];

//get the images elements
const imagesContainer = document.getElementById('imagesContainer');
const image1 = document.getElementById('img1');
const image2 = document.getElementById('img2');
const image3 = document.getElementById('img3');
// image1.src='../images/bag.jps'; ctrl + /
let imageIndex =[];
let usedNums = [];
let votes =[];
let views = [];
const rounds = 3;
let counterRounds = 0;

// array.indexOf(12);
//create random function
function randomNum(min,max,length,repeatedAllowed, notTheseNums) //length:is how many random numbers you want , repeatedAllowed is do you want to allow repeated number or only uniqe (true or false)
{
  let randomNumbers = [];
  let number = 0;
  let posiible = 1; //this to hold a value I will check on it to see if it's possible to not repeat numbers somI will not enter infinite loop
  if(max-min < length || (max-notTheseNums.length)<(length-1)) //to check if it's possible to not repeat the numbers
    posiible=0;

  for(let i = 0; i<length ; i++)
  {
    number = Math.floor(Math.random()*(max-min)+min);
    // randomNumbers.push(number);
    // console.log('index is ', randomNumbers.indexOf(number));
    if(posiible && !repeatedAllowed && randomNumbers.indexOf(number)===-1 && notTheseNums.indexOf(number)===-1)

      randomNumbers.push(number);

    else if(posiible && !repeatedAllowed)
      i--;
    else
      randomNumbers.push(number);
  }
  // console.log('random numbers ', randomNumbers);
  return randomNumbers;
}
// let obj = [];

//create a constructor for the images slide show
function SlideShow(imageName)
{
  this.imageName = imageName;
  this.path = `../images/${this.imageName}.jpg`;
  this.votes = 0;
  this.views = 0;
  SlideShow.all.push(this);
  // obj.push(this)


}
SlideShow.all = [];


//create objects for the images
for(let i = 0 ; i<imgNames.length ; i++)
{
  new SlideShow(imgNames[i]);
}

console.table(SlideShow.all);
// console.log(randomNum(5,12,4,false));

SlideShow.all[0];
//to show the images on the page
function render()
{
  imageIndex = randomNum(0,imgNames.length-0.5,3,false,usedNums); //[4,9,1] //[2,4,5]
  usedNums.push(imageIndex[0]);
  usedNums.push(imageIndex[1]);
  usedNums.push(imageIndex[2]);
  // console.log('used nums ', usedNums);
  image1.src = SlideShow.all[imageIndex[0]].path; //SlidShow.all[4].path
  SlideShow.all[imageIndex[0]].views ++;
  image2.src = SlideShow.all[imageIndex[1]].path; //SlideShow.all[9]
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
    if(counterRounds<rounds-1)
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
    // image1.removeEventListener('click',trafiic(x));
    // image2.removeEventListener('click',trafiic(x));
    // image3.removeEventListener('click',trafiic,true);
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
  document.getElementById('dataList').appendChild(ulEl);
  for(let i =0 ; i<SlideShow.all.length ; i++)
  {
    votes.push(SlideShow.all[i].votes);
    views.push(SlideShow.all[i].views);
    const liEl = document.createElement('li');
    ulEl.appendChild(liEl);
    liEl.textContent = `${SlideShow.all[i].imageName} had ${SlideShow.all[i].votes} votes, and was seen ${SlideShow.all[i].views} times`;
  }
  chartRender();
  console.log('votes ',votes);
  console.log('views ', views);
  btnClicked++;
}



function chartRender() {
  let ctx = document.getElementById('dataChart').getContext('2d');
  let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: imgNames,
      datasets: [{
        label: 'Product votes',
        fontColor:'white',
        backgroundColor: 'yellow',
        borderColor: 'white',
        data: votes
      },
      {
        label: 'Product views',
        backgroundColor: '#003f5c',
        borderColor: 'white',
        data: views
      }]
    },

    // Configuration options go here
    options: {}
  });
}
