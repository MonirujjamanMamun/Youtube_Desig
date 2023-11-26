// *******************
// selector common function
// *******************
const selectById = (id) => {
  return document.getElementById(id);
};

// *******************
// Common load data function
// *******************
const loadData = async (api) => {
  try {
    const res = await fetch(api);
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

// *******************
// convert minutes
// *******************
const formatDuration = (minutes) => {
  if (minutes < 0) {
    return 'Invalid duration';
  }

  const minutesInHour = 60;
  const minutesInDay = 24 * minutesInHour;
  const minutesInMonth = 30 * minutesInDay;

  const months = Math.floor(minutes / minutesInMonth);
  const days = Math.floor((minutes % minutesInMonth) / minutesInDay);
  const hours = Math.floor((minutes % minutesInDay) / minutesInHour);
  const remainingMinutes = minutes % minutesInHour;

  const parts = [];

  if (months > 0) {
    parts.push(`${months} month${months > 1 ? 's' : ''}`);
  }

  if (days > 0) {
    parts.push(`${days} day${days > 1 ? 's' : ''}`);
  }

  if (hours > 0) {
    parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
  }

  if (remainingMinutes > 0) {
    parts.push(`${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`);
  }

  if (parts.length === 0) {
    return 'Just now';
  }

  return parts.join(', ') + ' ago';
};

// *******************
// Nav catagori
// *******************
const allHandelar = async () => {
  const api = 'https://openapi.programming-hero.com/api/videos/categories';
  const categoriesData = await loadData(api);
  showData(categoriesData.data);
};

// *******************
// Nav catagori showing
// *******************
const showData = (data) => {
  console.log(data);

  const navAll = selectById('nav-all');
  data.forEach((ele) => {
    const navDiv = document.createElement('div');
    navDiv.innerHTML = `
    <button
    onclick="handelCardData(${ele.category_id})"
    class="px-5 py-1 text-[18px] mx-2 rounded bg-[#ff1f3d] hover:bg-[#ff1f3d]"
  >
    ${ele.category}
  </button>`;
    navAll.appendChild(navDiv);
  });
};

allHandelar();

const loadAllData = async (id) => {
  const api = `https://openapi.programming-hero.com/api/videos/category/1000`;
  const cardData = await loadData(api);
  showAllData(cardData.data);
};

loadAllData();
// *******************
// Catagori data load
// *******************
const handelCardData = async (id) => {
  const api = `https://openapi.programming-hero.com/api/videos/category/${id}`;
  const cardData = await loadData(api);
  showAllData(cardData.data);
};

// *******************
// Catagori data showing
// *******************
const showAllData = (data) => {
  console.log(data);
  const cardHeader = selectById('card-header');
  const showDataDiv = selectById('all-data');
  if (data.length == 0) {
    cardHeader.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('text-center');
    div.innerHTML = `
        <img class="inline-block" src="./img/Icon.png" alt="" />
        <p class="text-[32px] font-bold">
          Oops!! Sorry, There is no content here
        </p>
    `;
    cardHeader.appendChild(div);
  } else {
    showDataDiv.innerHTML = '';
    data.forEach((ele) => {
      // console.log(ele.others.posted_date);
      let checkverify =
        ele.authors[0].verified == true
          ? '<img width="15px" height="15px" src="./img/verified.png"}>'
          : '';
      const showDiv = document.createElement('div');
      showDiv.classList.add('col-span-12', 'sm:col-span-6', 'md:col-span-3');
      showDiv.innerHTML = ` 
            <card class="w-full flex flex-col">
              <div class="relative">
                <!-- Image Video -->
                <a href="#">
                  <img
                    src=${ele.thumbnail}
                    class="w-96 h-auto"
                  />
                </a>

                <p
                  class="absolute right-2 bottom-2 bg-gray-900 text-gray-100 text-xs px-1 py"
                >
                   ${formatDuration(ele.others.posted_date)}
                </p>
              </div>

              <div class="flex flex-row mt-2 gap-2">
                <!-- Profile Picture -->
                <a href="#">
                  <img
                    src=${ele.authors[0].profile_picture}
                    class="rounded-full max-h-10 max-w-10"
                  />
                </a>

                <!-- Description -->
                <div clas="flex flex-col">
                  <a href="#">
                    <p class="text-black text-sm font-semibold">
                      ${ele.title}
                    </p>
                  </a>
                  <a
                    class="text-gray-400 text-xs mt-2 hover:text-gray-100 flex"
                    href="#"
                  >
                    <span>${
                      ele.authors[0].profile_name
                    }</span> <span> ${checkverify}</span>
                  </a>
                  <p class="text-gray-400 text-xs mt-1">
                    ${ele.others.views} views
                  </p>
                </div>
              </div>
            </card>
          `;
      showDataDiv.appendChild(showDiv);
    });
  }
};
