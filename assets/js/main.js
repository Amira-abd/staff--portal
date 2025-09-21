
(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('#navmenu a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
  
      if (targetSection) {
        e.preventDefault();
  
        // إخفاء كل الأقسام
        document.querySelectorAll('section').forEach(section => {
          section.style.display = 'none';
        });
  
        // إظهار القسم المستهدف فقط
        targetSection.style.display = 'block';
  
        // تحديث العنصر النشط في القائمة
        document.querySelectorAll('#navmenu a').forEach(a => a.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });
  
  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();


        
     // About Section   
  const editBtn = document.getElementById('edit-about-btn');
  const saveBtn = document.getElementById('save-about-btn');

  editBtn.addEventListener('click', () => {
    // نتأكد ما فيش inputs موجودة أصلاً
    const inputs = document.querySelectorAll('#about input.form-control');
    if (inputs.length > 0) return; // لو inputs موجودة مانعملش حاجة

    const spans = document.querySelectorAll('#about .about-data');
    spans.forEach(span => {
      const type = span.dataset.type || 'text';
      let value = span.textContent.trim();

      if(type === 'date') {
        const parts = value.split('/');
        if(parts.length === 3) {
          value = `${parts[2]}-${parts[1].padStart(2,'0')}-${parts[0].padStart(2,'0')}`;
        }
      }

      const input = document.createElement('input');
      input.type = type;
      input.value = value;
      input.className = 'form-control mb-1';
      span.replaceWith(input);
    });

    editBtn.style.display = 'none';
    saveBtn.style.display = "inline-flex";
  });

  saveBtn.addEventListener('click', () => {
    const inputs = document.querySelectorAll('#about input.form-control');
    if (inputs.length === 0) return; // لو ما فيش inputs مانعملش حاجة

    inputs.forEach(input => {
      let value = input.value.trim();

      if(input.type === 'date') {
        const parts = value.split('-');
        if(parts.length === 3) {
          value = `${parseInt(parts[2])}/${parseInt(parts[1])}/${parts[0]}`;
        }
      }

      const span = document.createElement('span');
      span.className = 'about-data';
      span.dataset.type = input.type;
      span.textContent = value;
      input.replaceWith(span);
    });

    saveBtn.style.display = "none";
    editBtn.style.display = "inline-flex";
  });

  
  const fileInput = document.getElementById("cvInput");
  const save = document.getElementById("saveBtn");
  const previewBox = document.getElementById("cvPreview");
  const fileNameLink = document.getElementById("fileName");
  const deleteFile = document.getElementById("deleteFile");
  const selectedFileName = document.getElementById("selectedFileName");
  const uploadSection = document.getElementById("uploadSection");
  
  let selectedFile = null;
  
  fileInput.addEventListener("change", function () {
    selectedFile = this.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      selectedFileName.textContent = selectedFile.name;
    } else {
      selectedFileName.textContent = "";
      alert("الرجاء اختيار ملف PDF فقط.");
      fileInput.value = "";
      selectedFile = null;
    }
  });
  
  save.addEventListener("click", function () {
    if (selectedFile) {
      fileNameLink.textContent = selectedFile.name;
      fileNameLink.href = URL.createObjectURL(selectedFile);
      previewBox.style.display = "flex";
      uploadSection.style.display = "none"; // إخفاء الرفع
    } else {
      alert("الرجاء اختيار ملف PDF.");
    }
  });
  
  deleteFile.addEventListener("click", function () {
    selectedFile = null;
    fileInput.value = "";
    previewBox.style.display = "none";
    fileNameLink.textContent = "";
    selectedFileName.textContent = "";
    uploadSection.style.display = "block"; // إظهار إمكانية الرفع مرة أخرى
  });
  
      function toggleFiles(link) {
      const courseDiv = link.closest('.course');
      const table = courseDiv.querySelector('.file-table');
      table.style.display = table.style.display === 'table' ? 'none' : 'table';
    }

  //  socialLinks  
  
  document.addEventListener("DOMContentLoaded", function () {
    const editBtn = document.getElementById("edit-about-btn");
    const saveBtn = document.getElementById("save-about-btn");
    const socialSection = document.querySelector(".social-section");
    const socialForm = document.getElementById("social-links-edit");
  
    // الروابط الحالية
    const links = {
      facebook: document.querySelector(".social-btn.facebook"),
      linkedin: document.querySelector(".social-btn[data-type='linkedin']"),
      Google: document.querySelector(".social-btn[data-type='Google']"),
      Researchgate: document.querySelector(".social-btn.Researchgate"),
      Orcid: document.querySelector(".social-btn[data-type='Orcid']")
    };
  
    // الحقول
    const inputs = {
      facebook: document.getElementById("facebookInput"),
      linkedin: document.getElementById("linkedinInput"),
      Google: document.getElementById("GoogleInput"),
      Researchgate: document.getElementById("ResearchgateInput"),
      Orcid: document.getElementById("OrcidInput")
    };
  
    editBtn.addEventListener("click", () => {
      saveBtn.style.display = "inline-flex";
      editBtn.style.display = "none";
      socialSection.style.display = "none";
      socialForm.style.display = "flex";
  
      // تحميل الروابط الحالية في الحقول
      Object.keys(links).forEach(key => {
        if (links[key] && inputs[key]) {
          inputs[key].value = links[key].getAttribute("href") || "";
        }
      });
    });
  
    saveBtn.addEventListener("click", () => {
      saveBtn.style.display = "none";
      editBtn.style.display = "inline-flex";
      socialSection.style.display = "block";
      socialForm.style.display = "none";
  
      // تحديث الروابط
      Object.keys(links).forEach(key => {
        if (links[key] && inputs[key]) {
          links[key].setAttribute("href", inputs[key].value.trim());
        }
      });
    });
  });
  
  
  //    Course Section   
let editCourseIndex = null;

// إظهار نموذج الإضافة
document.getElementById("addCourseBtn").addEventListener("click", function () {
  document.getElementById("CourseForm").style.display = "block";
  document.getElementById("inputCourse").value = "";
  document.getElementById("Courseuni").value = "";
  document.getElementById("Courseyear").value = "";
  document.getElementById("saveCourseBtn").disabled = true;
  editCourseIndex = null;
});

// تفعيل زر الحفظ عند إدخال بيانات
["inputCourse", "Courseuni", "Courseyear"].forEach(id => {
  document.getElementById(id).addEventListener("input", checkCourseForm);
});

function checkCourseForm() {
  const title = document.getElementById("inputCourse").value.trim();
  const uni = document.getElementById("Courseuni").value.trim();
  const year = document.getElementById("Courseyear").value.trim();

  document.getElementById("saveCourseBtn").disabled = !(title && uni && year);
}

// حفظ البيانات (إضافة أو تعديل)
document.getElementById("saveCourseBtn").addEventListener("click", function () {
  const title = document.getElementById("inputCourse").value.trim();
  const uni = document.getElementById("Courseuni").value.trim();
  const year = document.getElementById("Courseyear").value.trim();
  const tableBody = document.getElementById("CourseTableBody");

  if (editCourseIndex !== null) {
    const row = tableBody.rows[editCourseIndex];
    row.cells[0].innerText = title;
    row.cells[1].innerText = uni;
    row.cells[2].innerText = year;
  } else {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${title}</td>
      <td>${uni}</td>
      <td>${year}</td>
      <td>
        <button class="editCourseBtn btn btn-sm btn-outline-primary">✏️</button>
        <button class="deleteCourseBtn btn btn-sm btn-outline-danger">🗑️</button>
      </td>
    `;
    tableBody.appendChild(row);
  }

  closeCourseForm();
});

// إغلاق النموذج
document.getElementById("cancelCourseBtn").addEventListener("click", closeCourseForm);
function closeCourseForm() {
  document.getElementById("CourseForm").style.display = "none";
}

// تعديل / حذف من الجدول
document.getElementById("CourseTableBody").addEventListener("click", function (e) {
  const row = e.target.closest("tr");
  if (e.target.classList.contains("editCourseBtn")) {
    editCourseIndex = row.rowIndex - 1;
    document.getElementById("inputCourse").value = row.cells[0].innerText;
    document.getElementById("Courseuni").value = row.cells[1].innerText;
    document.getElementById("Courseyear").value = row.cells[2].innerText;
    checkCourseForm();
    document.getElementById("CourseForm").style.display = "block";
  }

  if (e.target.classList.contains("deleteCourseBtn")) {
    if (confirm("هل أنت متأكد أنك تريد الحذف؟")) {
      row.remove();
    }
  }
});


    // research Section
    let selectedResearchType = '';
    const titleInput = document.getElementById("researchTitle");
    const yearInput = document.getElementById("researchYear");
    const researchFile = document.getElementById("researchFile");
    const saveResearchBtn = document.getElementById("saveResearchBtn");
  
    function openResearchForm(type) {
      selectedResearchType = type;
      document.getElementById("formTypeTitle").innerText = type;
      document.getElementById("researchForm").style.display = "block";
      titleInput.value = '';
      yearInput.value = '';
      researchFile.value = '';
      saveResearchBtn.disabled = true;
    }
  
    function cancelResearchForm() {
      document.getElementById("researchForm").style.display = "none";
    }
  
    function saveResearch() {
      const title = titleInput.value.trim();
      const year = yearInput.value.trim();
      const file = researchFile.files[0];
  
      if (!title || !year || !file) return;
  
      const reader = new FileReader();
      reader.onload = function () {
        const link = `<a href="${reader.result}" target="_blank">PDF</a>`;
        const row = `
        <tr>
          <td>${selectedResearchType}</td>
          <td>${title}</td>
          <td>${new Date(year).getFullYear()}</td>
          <td>${link}</td>
          <td>
            <button class="editResearchBtn btn btn-sm btn-outline-primary">✏️</button>
            <button class="deleteResearchBtn btn btn-sm btn-outline-danger">🗑️</button>
          </td>
        </tr>
      `;
      
        document.getElementById("researchTableBody").insertAdjacentHTML("beforeend", row);
        cancelResearchForm();
      };
      reader.readAsDataURL(file);
    }
  
    [titleInput, yearInput, researchFile].forEach(input => {
      input.addEventListener("input", () => {
        saveResearchBtn.disabled = !(titleInput.value && yearInput.value && researchFile.files.length);
      });
    });
    // تفعيل أزرار التعديل والحذف داخل قسم research
document.getElementById("researchTableBody").addEventListener("click", function (e) {
  const target = e.target;
  const row = target.closest("tr");

  if (target.classList.contains("editResearchBtn")) {
    const type = row.cells[0].innerText;
    const title = row.cells[1].innerText;
    const year = row.cells[2].innerText;

    // ملء النموذج
    selectedResearchType = type;
    document.getElementById("formTypeTitle").innerText = type;
    document.getElementById("researchForm").style.display = "block";
    titleInput.value = title;
    yearInput.value = `${year}-01-01`;
    researchFile.value = ''; // لا يمكن ملء ملف تلقائياً
    saveResearchBtn.disabled = false;

    // حذف الصف مؤقتاً حتى إعادة الحفظ
    row.remove();
  }

  if (target.classList.contains("deleteResearchBtn")) {
    if (confirm("هل تريد حذف هذا السطر؟")) {
      row.remove();
    }
  }
});

    // Workshops Section
 let editWorkshopIndex = null;

// عناصر الإدخال
const workshopTitle = document.getElementById("workshopTitle");
const workshopRole = document.getElementById("country");
const workshopYear = document.getElementById("workshopYear");
const saveWorkshopsBtn = document.getElementById("saveWorkshopsBtn");
const form = document.getElementById("WorkshopForm");
const tableBody = document.getElementById("WorkshopTableBody");

// فتح النموذج
document.getElementById("addWorkshopsBtn").addEventListener("click", () => {
  workshopTitle.value = "";
  workshopRole.value = "role1";
  workshopYear.value = "";
  editWorkshopIndex = null;
  form.style.display = "block";
  saveWorkshopsBtn.disabled = true;
});

// تحقق من تفعيل زر الحفظ
[workshopTitle, workshopRole, workshopYear].forEach(input => {
  input.addEventListener("input", toggleSaveButton);
});
workshopRole.addEventListener("change", toggleSaveButton);

function toggleSaveButton() {
  saveWorkshopsBtn.disabled = !(workshopTitle.value.trim() && workshopRole.value && workshopYear.value.trim());
}

// حفظ البيانات
saveWorkshopsBtn.addEventListener("click", () => {
  const title = workshopTitle.value.trim();
  const role = workshopRole.value;
  const year = workshopYear.value.trim();

  if (editWorkshopIndex !== null) {
    const row = tableBody.rows[editWorkshopIndex];
    row.cells[0].innerText = title;
    row.cells[1].innerText = role;
    row.cells[2].innerText = year;
  } else {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${title}</td>
      <td>${role}</td>
      <td>${year}</td>
      <td>
        <button onclick="editWorkshopRow(this)" class="btn btn-sm btn-outline-primary">✏️</button>
        <button onclick="deleteWorkshopRow(this)" class="btn btn-sm btn-outline-danger">🗑️</button>
      </td>
    `;
    tableBody.appendChild(row);
  }

  form.style.display = "none";
});

// إلغاء النموذج
document.getElementById("cancelWorkshopsBtn").addEventListener("click", () => {
  form.style.display = "none";
});

// حذف ورشة
window.deleteWorkshopRow = function (btn) {
  const row = btn.closest("tr");
  if (confirm("Do you want to delete this row?")) {
    row.remove();
  }
};

// تعديل ورشة
window.editWorkshopRow = function (btn) {
  const row = btn.closest("tr");
  editWorkshopIndex = row.rowIndex - 1;
  workshopTitle.value = row.cells[0].innerText;
  workshopRole.value = row.cells[1].innerText;
  workshopYear.value = row.cells[2].innerText;
  toggleSaveButton();
  form.style.display = "block";
};



 // supervision Section
let currentSupervisionType = "";
let editingRowIndex = null;

// فتح النموذج حسب النوع
function opensupervisionForm(type) {
  currentSupervisionType = type;
  document.getElementById('supervisionTypeTitle').textContent = type;
  document.getElementById('supervisionTitle').value = '';
  document.getElementById('supervisionYear').value = '';
  document.getElementById('savesupervisionBtn').disabled = true;
  editingRowIndex = null;
  document.getElementById('supervisionForm').style.display = 'flex';
}

// إغلاق النموذج
function cancelsupervisionForm() {
  document.getElementById('supervisionForm').style.display = 'none';
}

// تفعيل زر الحفظ عند ملء الحقول
document.getElementById('supervisionTitle').addEventListener('input', toggleSaveBtn);
document.getElementById('supervisionYear').addEventListener('input', toggleSaveBtn);

function toggleSaveBtn() {
  const title = document.getElementById('supervisionTitle').value.trim();
  const year = document.getElementById('supervisionYear').value.trim();
  document.getElementById('savesupervisionBtn').disabled = !(title && year);
}

// حفظ البيانات
function savesupervision() {
  const title = document.getElementById('supervisionTitle').value.trim();
  const year = document.getElementById('supervisionYear').value.trim();
  const table = document.getElementById('supervisionTableBody');

  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${currentSupervisionType}</td>
    <td>${title}</td>
    <td>${year}</td>
    <td>
      <button class="editsupervisionBtn btn btn-sm btn-outline-primary">✏️</button>
      <button class="deletesupervisionBtn btn btn-sm btn-outline-danger">🗑️</button>
    </td>
  `;

  if (editingRowIndex !== null) {
    const oldRow = table.rows[editingRowIndex];
    oldRow.replaceWith(newRow);
  } else {
    table.appendChild(newRow);
  }

  sortSupervisionTable();
  document.getElementById('supervisionForm').style.display = 'none';
}

// التعامل مع التعديل والحذف
document.getElementById('supervisionTableBody').addEventListener('click', function (e) {
  const row = e.target.closest('tr');
  if (e.target.classList.contains('editsupervisionBtn')) {
    editingRowIndex = row.rowIndex - 1;
    currentSupervisionType = row.cells[0].innerText;
    document.getElementById('supervisionTypeTitle').textContent = currentSupervisionType;
    document.getElementById('supervisionTitle').value = row.cells[1].innerText;
    document.getElementById('supervisionYear').value = row.cells[2].innerText;
    toggleSaveBtn();
    document.getElementById('supervisionForm').style.display = 'flex';
  }

  if (e.target.classList.contains('deletesupervisionBtn')) {
    if (confirm("Do you want to delete this row?")) {
      row.remove();
    }
  }
});

// ترتيب الصفوف: PhD ثم MSc ثم Projects
function sortSupervisionTable() {
  const table = document.getElementById('supervisionTableBody');
  const rows = Array.from(table.querySelectorAll('tr'));

  const priority = {
    'Supervised PhD': 1,
    'Supervised MSc': 2,
    'Supervised Projects': 3
  };

  rows.sort((a, b) => {
    const aType = a.cells[0].innerText.trim();
    const bType = b.cells[0].innerText.trim();
    return (priority[aType] || 4) - (priority[bType] || 4);
  });

  table.innerHTML = ''; // تفريغ الجدول
  rows.forEach(row => table.appendChild(row)); // إعادة الترتيب
}


 // Educations Section
let editEducationsIndex = null;

document.getElementById("addEducationsButton").addEventListener("click", function () {
  document.getElementById("EducationsForm").style.display = "block";
  document.getElementById("EducationsUniversity").value = "";
  document.getElementById("EducationsFaculty").value = "";
  document.getElementById("EducationsDegree").value = "";
  document.getElementById("EducationsYear").value = "";
  document.getElementById("saveEducationsBtn").disabled = true;
  editEducationsIndex = null;
});

// تفعيل زر الحفظ عند ملء الحقول
["EducationsUniversity", "EducationsFaculty", "EducationsDegree", "EducationsYear"].forEach(id => {
  document.getElementById(id).addEventListener("input", checkEducationsForm);
});

function checkEducationsForm() {
  const uni = document.getElementById("EducationsUniversity").value.trim();
  const fac = document.getElementById("EducationsFaculty").value.trim();
  const deg = document.getElementById("EducationsDegree").value.trim();
  const year = document.getElementById("EducationsYear").value.trim();

  document.getElementById("saveEducationsBtn").disabled = !(uni && fac && deg && year);
}

document.getElementById("saveEducationsBtn").addEventListener("click", function () {
  const uni = document.getElementById("EducationsUniversity").value.trim();
  const fac = document.getElementById("EducationsFaculty").value.trim();
  const deg = document.getElementById("EducationsDegree").value.trim();
  const year = document.getElementById("EducationsYear").value.trim();
  const tableBody = document.getElementById("EducationsTableBody");

  if (editEducationsIndex !== null) {
    const row = tableBody.rows[editEducationsIndex];
    row.cells[0].innerText = uni;
    row.cells[1].innerText = fac;
    row.cells[2].innerText = deg;
    row.cells[3].innerText = year;
  } else {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${uni}</td>
      <td>${fac}</td>
      <td>${deg}</td>
      <td>${year}</td>
      <td>
        <button class="editEducationsBtn btn btn-sm btn-outline-primary">✏️</button>
        <button class="deleteEducationsBtn btn btn-sm btn-outline-danger">🗑️</button>
      </td>
    `;
    tableBody.appendChild(row);
  }

  closeEducationsForm();
});

// إغلاق النموذج
document.getElementById("cancelEducationsBtn").addEventListener("click", closeEducationsForm);
function closeEducationsForm() {
  document.getElementById("EducationsForm").style.display = "none";
}

// تعديل
document.getElementById("EducationsTableBody").addEventListener("click", function (e) {
  if (e.target.classList.contains("editEducationsBtn")) {
    const row = e.target.closest("tr");
    editEducationsIndex = row.rowIndex - 1;
    document.getElementById("EducationsUniversity").value = row.cells[0].innerText;
    document.getElementById("EducationsFaculty").value = row.cells[1].innerText;
    document.getElementById("EducationsDegree").value = row.cells[2].innerText;
    document.getElementById("EducationsYear").value = row.cells[3].innerText;
    checkEducationsForm();
    document.getElementById("EducationsForm").style.display = "block";
  }

  // حذف
  if (e.target.classList.contains("deleteEducationsBtn")) {
    e.target.closest("tr").remove();
  }
});

 // Languages Section
  let editLanguageIndex = null;

  document.getElementById("addLanguageButton").addEventListener("click", function () {
    document.getElementById("LanguageForm").style.display = "block";
    document.getElementById("inputLanguage").value = "";
    document.getElementById("Reading").value = "";
    document.getElementById("Speaking").value = "";
    document.getElementById("Writting").value = "";
    document.getElementById("saveLanguageBtn").disabled = true;
    editLanguageIndex = null;
  });

  // تفعيل زر الحفظ عند ملء الحقول
  ["Language", "Reading", "Speaking", "Writting"].forEach(id => {
    document.getElementById(id).addEventListener("input", checkLanguageForm);
  });

  function checkLanguageForm() {
    const language = document.getElementById("inputLanguage").value.trim();
    const reading = document.getElementById("Reading").value.trim();
    const speaking = document.getElementById("Speaking").value.trim();
    const writing = document.getElementById("Writting").value.trim();

    document.getElementById("saveLanguageBtn").disabled = !(language && reading && speaking && writing);
  }

  document.getElementById("saveLanguageBtn").addEventListener("click", function () {
    const language = document.getElementById("inputLanguage").value.trim();
    const reading = document.getElementById("Reading").value.trim();
    const speaking = document.getElementById("Speaking").value.trim();
    const writing = document.getElementById("Writting").value.trim();
    const tableBody = document.getElementById("LanguageTableBody");

    if (editLanguageIndex !== null) {
      const row = tableBody.rows[editLanguageIndex];
      row.cells[0].innerText = language;
      row.cells[1].innerText = reading;
      row.cells[2].innerText = speaking;
      row.cells[3].innerText = writing;
    } else {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${language}</td>
        <td>${reading}</td>
        <td>${speaking}</td>
        <td>${writing}</td>
        <td>
          <button class="editLanguageBtn btn btn-sm btn-outline-primary">✏️</button>
          <button class="deleteLanguageBtn btn btn-sm btn-outline-danger">🗑️</button>
        </td>
      `;
      tableBody.appendChild(row);
    }

    closeLanguageForm();
  });

  function closeLanguageForm() {
    document.getElementById("LanguageForm").style.display = "none";
  }

  document.getElementById("cancelLanguageBtn").addEventListener("click", closeLanguageForm);

  document.getElementById("LanguageTableBody").addEventListener("click", function (e) {
    const row = e.target.closest("tr");

    if (e.target.classList.contains("editLanguageBtn")) {
      editLanguageIndex = row.rowIndex - 1;
      document.getElementById("inputLanguage").value = row.cells[0].innerText;
      document.getElementById("Reading").value = row.cells[1].innerText;
      document.getElementById("Speaking").value = row.cells[2].innerText;
      document.getElementById("Writting").value = row.cells[3].innerText;
      document.getElementById("LanguageForm").style.display = "block";
      checkLanguageForm();
    }

    if (e.target.classList.contains("deleteLanguageBtn")) {
      row.remove();
    }
  });


 // positions Section
 
  const addPositionBtn = document.getElementById("addPositionButton");
  const positionForm = document.getElementById("PositionForm");
  const savepositionsButton = document.getElementById("savepositionsButton");
  const cancelBtn = document.querySelector("#PositionForm .save-btn[style*='gray']");
  const formError = document.querySelector(".formError");

  const company = document.getElementById("company");
  const universitySelect = document.getElementById("country");
  const fromInput = document.getElementById("subject");
  const toInput = document.getElementById("duration");

  const positionTableBody = document.getElementById("positionTableBody");

  let editIndex = null;

  // فتح النموذج
  addPositionBtn.addEventListener("click", () => {
    positionForm.style.display = "block";
    editIndex = null;
    company.value = "";
    universitySelect.value = "Minya";
    fromInput.value = "";
    toInput.value = "";
    savepositionsButton.disabled = true;
    formError.style.display = "none";
  });

  // إلغاء النموذج
  function cancelForm() {
    positionForm.style.display = "none";
    editIndex = null;
  }

  // التحقق من الحقول
  function validateForm() {
    const isValid = company.value.trim() !== "" &&
      universitySelect.value.trim() !== "" &&
      fromInput.value.trim() !== "" &&
      toInput.value.trim() !== "";

    savepositionsButton.disabled = !isValid;
    formError.style.display = isValid ? "none" : "block";
  }

  // مراقبة تغييرات الحقول
  [company, universitySelect, fromInput, toInput].forEach(input => {
    input.addEventListener("input", validateForm);
  });

  // الحفظ
  function saveForm() {
    if (savepositionsButton.disabled) return;

    const newRow = `
      <tr>
        <td>${company.value}</td>
        <td>${universitySelect.value}</td>
        <td>${fromInput.value}</td>
        <td>${toInput.value}</td>
        <td>
          <button class="editPositionBtn btn btn-sm btn-outline-primary">✏️</button>
          <button class="deletePositionBtn btn btn-sm btn-outline-danger">🗑️</button>
        </td>
      </tr>`;

    if (editIndex === null) {
      positionTableBody.insertAdjacentHTML("beforeend", newRow);
    } else {
      positionTableBody.rows[editIndex].outerHTML = newRow;
    }

    attachButtonListeners(); // إعادة تفعيل الأحداث
    cancelForm();
  }

  // تعديل الصف
  function editRow(index) {
    const row = positionTableBody.rows[index];
    company.value = row.cells[0].textContent;
    universitySelect.value = row.cells[1].textContent;
    fromInput.value = row.cells[2].textContent;
    toInput.value = row.cells[3].textContent;

    editIndex = index;
    positionForm.style.display = "block";
    validateForm();
  }

  // حذف الصف
  function deleteRow(index) {
    positionTableBody.deleteRow(index);
  }

  // تفعيل أزرار التعديل والحذف
  function attachButtonListeners() {
    const editButtons = document.querySelectorAll(".editPositionBtn");
    const deleteButtons = document.querySelectorAll(".deletePositionBtn");

    editButtons.forEach((btn, idx) => {
      btn.onclick = () => editRow(idx);
    });

    deleteButtons.forEach((btn, idx) => {
      btn.onclick = () => deleteRow(idx);
    });
  }

  // تفعيل الأزرار عند بداية التشغيل
  attachButtonListeners();



// award Section
  let editAwardIndex = null;

  document.getElementById("addawardButton").addEventListener("click", function () {
    document.getElementById("awardForm").style.display = "block";
    document.getElementById("inputAward").value = "";
    document.getElementById("Organization").value = "";
    document.getElementById("saveawardBtn").disabled = true;
    editAwardIndex = null;
  });

  // تفعيل زر الحفظ عند ملء الحقول
  document.getElementById("inputAward").addEventListener("input", checkAwardForm);
  document.getElementById("Organization").addEventListener("input", checkAwardForm);

  function checkAwardForm() {
    const award = document.getElementById("inputAward").value.trim();
    const org = document.getElementById("Organization").value.trim();
    document.getElementById("saveawardBtn").disabled = !(award && org);
  }

  document.getElementById("saveawardBtn").addEventListener("click", function () {
    const award = document.getElementById("inputAward").value.trim();
    const org = document.getElementById("Organization").value.trim();
    const tableBody = document.getElementById("awardTableBody");

    if (editAwardIndex !== null) {
      const row = tableBody.rows[editAwardIndex];
      row.cells[0].innerText = award;
      row.cells[1].innerText = org;
    } else {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${award}</td>
        <td>${org}</td>
        <td>
          <button class="editawardBtn btn btn-sm btn-outline-primary">✏️</button>
          <button class="deleteawardBtn btn btn-sm btn-outline-danger">🗑️</button>
        </td>
      `;
      tableBody.appendChild(row);
    }

    closeAwardForm();
  });

  function closeAwardForm() {
    document.getElementById("awardForm").style.display = "none";
  }

  document.getElementById("cancelawardBtn").addEventListener("click", closeAwardForm);

  document.getElementById("awardTableBody").addEventListener("click", function (e) {
    const row = e.target.closest("tr");

    if (e.target.classList.contains("editawardBtn")) {
      editAwardIndex = row.rowIndex - 1;
      document.getElementById("inputAward").value = row.cells[0].innerText;
      document.getElementById("Organization").value = row.cells[1].innerText;
      document.getElementById("awardForm").style.display = "block";
      checkAwardForm();
    }

    if (e.target.classList.contains("deleteawardBtn")) {
      row.remove();
    }
  });


   // Committees Section
  let editCommitteeIndex = null;

  // زر الإضافة
  document.getElementById("addCommitteesButton").addEventListener("click", function () {
    document.getElementById("CommitteesForm").style.display = "block";
    document.getElementById("inputCommittees").value = "";
    document.getElementById("Committeesfrom").value = "";
    document.getElementById("CommitteesTo").value = "";
    document.getElementById("saveCommitteesBtn").disabled = true;
    editCommitteeIndex = null;
  });

  // تفعيل زر الحفظ عند ملء الحقول
  document.getElementById("inputCommittees").addEventListener("input", checkCommitteesForm);
  document.getElementById("Committeesfrom").addEventListener("input", checkCommitteesForm);
  document.getElementById("CommitteesTo").addEventListener("input", checkCommitteesForm);

  function checkCommitteesForm() {
    const title = document.getElementById("inputCommittees").value.trim();
    const from = document.getElementById("Committeesfrom").value.trim();
    const to = document.getElementById("CommitteesTo").value.trim();
    document.getElementById("saveCommitteesBtn").disabled = !(title && from && to);
  }

  // حفظ البيانات
  document.getElementById("saveCommitteesBtn").addEventListener("click", function () {
    const title = document.getElementById("inputCommittees").value.trim();
    const from = document.getElementById("Committeesfrom").value.trim();
    const to = document.getElementById("CommitteesTo").value.trim();
    const tableBody = document.getElementById("CommitteesTableBody");

    if (editCommitteeIndex !== null) {
      const row = tableBody.rows[editCommitteeIndex];
      row.cells[0].innerText = title;
      row.cells[1].innerText = from;
      row.cells[2].innerText = to;
    } else {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${title}</td>
        <td>${from}</td>
        <td>${to}</td>
        <td>
          <button class="editCommitteesBtn btn btn-sm btn-outline-primary">✏️</button>
          <button class="deleteCommitteesBtn btn btn-sm btn-outline-danger">🗑️</button>
        </td>
      `;
      tableBody.appendChild(row);
    }

    closeCommitteesForm();
  });

  // زر الإلغاء
  document.getElementById("cancelCommitteesBtn").addEventListener("click", closeCommitteesForm);

  function closeCommitteesForm() {
    document.getElementById("CommitteesForm").style.display = "none";
  }

  // تفعيل أزرار التعديل والحذف
  document.getElementById("CommitteesTableBody").addEventListener("click", function (e) {
    const row = e.target.closest("tr");

    if (e.target.classList.contains("editCommitteesBtn")) {
      editCommitteeIndex = row.rowIndex - 1;
      document.getElementById("inputCommittees").value = row.cells[0].innerText;
      document.getElementById("Committeesfrom").value = row.cells[1].innerText;
      document.getElementById("CommitteesTo").value = row.cells[2].innerText;
      document.getElementById("CommitteesForm").style.display = "block";
      checkCommitteesForm();
    }

    if (e.target.classList.contains("deleteCommitteesBtn")) {
      row.remove();
    }
  });

  //    // Committees Section
  // let editActivityIndex = null;

  // // زر الإضافة
  // document.getElementById("addActivitiesButton").addEventListener("click", function () {
  //   document.getElementById("ActivitiesForm").style.display = "block";
  //   document.getElementById("inputActivities").value = "";
  //   document.getElementById("Activitiesfrom").value = "";
  //   document.getElementById("ActivitiesTo").value = "";
  //   document.getElementById("saveActivitiesBtn").disabled = true;
  //   editActivityIndex = null;
  // });

  // // تفعيل زر الحفظ عند إدخال البيانات
  // document.getElementById("inputActivities").addEventListener("input", checkActivitiesForm);
  // document.getElementById("Activitiesfrom").addEventListener("input", checkActivitiesForm);
  // document.getElementById("ActivitiesTo").addEventListener("input", checkActivitiesForm);

  // function checkActivitiesForm() {
  //   const title = document.getElementById("inputActivities").value.trim();
  //   const from = document.getElementById("Activitiesfrom").value.trim();
  //   const to = document.getElementById("ActivitiesTo").value.trim();
  //   document.getElementById("saveActivitiesBtn").disabled = !(title && from && to);
  // }

  // // حفظ البيانات
  // document.getElementById("saveActivitiesBtn").addEventListener("click", function () {
  //   const title = document.getElementById("inputActivities").value.trim();
  //   const from = document.getElementById("Activitiesfrom").value.trim();
  //   const to = document.getElementById("ActivitiesTo").value.trim();
  //   const tableBody = document.getElementById("ActivitiesTableBody"); // مكرر الاستخدام

  //   if (editActivityIndex !== null) {
  //     const row = tableBody.rows[editActivityIndex];
  //     row.cells[0].innerText = title;
  //     row.cells[1].innerText = from;
  //     row.cells[2].innerText = to;
  //   } else {
  //     const row = document.createElement("tr");
  //     row.innerHTML = `
  //       <td>${title}</td>
  //       <td>${from}</td>
  //       <td>${to}</td>
  //       <td>
  //         <button class="editActivitiesBtn btn btn-sm btn-outline-primary">✏️</button>
  //         <button class="deleteActivitiesBtn btn btn-sm btn-outline-danger">🗑️</button>
  //       </td>
  //     `;
  //     tableBody.appendChild(row);
  //   }

  //   closeActivitiesForm();
  // });

  // // إلغاء
  // document.getElementById("cancelActivitiesBtn").addEventListener("click", closeActivitiesForm);

  // function closeActivitiesForm() {
  //   document.getElementById("ActivitiesForm").style.display = "none";
  // }

  // // تفعيل أزرار التعديل والحذف داخل الجدول
  // document.getElementById("ActivitiesTableBody").addEventListener("click", function (e) {
  //   const row = e.target.closest("tr");

  //   if (e.target.classList.contains("editActivitiesBtn")) {
  //     editActivityIndex = row.rowIndex - 1;
  //     document.getElementById("inputActivities").value = row.cells[0].innerText;
  //     document.getElementById("Activitiesfrom").value = row.cells[1].innerText;
  //     document.getElementById("ActivitiesTo").value = row.cells[2].innerText;
  //     document.getElementById("ActivitiesForm").style.display = "block";
  //     checkActivitiesForm();
  //   }

  //   if (e.target.classList.contains("deleteActivitiesBtn")) {
  //     row.remove();
  //   }
  // });

  //      // Experience Section
  // let editExperienceIndex = null;

  // // زر "إضافة"
  // document.getElementById("addExperienceButton").addEventListener("click", function () {
  //   document.getElementById("ExperienceForm").style.display = "block";
  //   document.getElementById("inputExperience").value = "";
  //   document.getElementById("Experiencefrom").value = "";
  //   document.getElementById("ExperienceTo").value = "";
  //   document.getElementById("saveExperienceBtn").disabled = true;
  //   editExperienceIndex = null;
  // });

  // // تفعيل زر الحفظ تلقائيًا عند إدخال بيانات
  // document.getElementById("inputExperience").addEventListener("input", checkExperienceForm);
  // document.getElementById("Experiencefrom").addEventListener("input", checkExperienceForm);
  // document.getElementById("ExperienceTo").addEventListener("input", checkExperienceForm);

  // function checkExperienceForm() {
  //   const name = document.getElementById("inputExperience").value.trim();
  //   const from = document.getElementById("Experiencefrom").value.trim();
  //   const to = document.getElementById("ExperienceTo").value.trim();
  //   document.getElementById("saveExperienceBtn").disabled = !(name && from && to);
  // }

  // // زر حفظ
  // document.getElementById("saveExperienceBtn").addEventListener("click", function () {
  //   const name = document.getElementById("inputExperience").value.trim();
  //   const from = document.getElementById("Experiencefrom").value.trim();
  //   const to = document.getElementById("ExperienceTo").value.trim();
  //   const tableBody = document.getElementById("ExperienceTableBody");

  //   if (editExperienceIndex !== null) {
  //     const row = tableBody.rows[editExperienceIndex];
  //     row.cells[0].innerText = name;
  //     row.cells[1].innerText = from;
  //     row.cells[2].innerText = to;
  //   } else {
  //     const row = document.createElement("tr");
  //     row.innerHTML = `
  //       <td>${name}</td>
  //       <td>${from}</td>
  //       <td>${to}</td>
  //       <td>
  //         <button class="editExperienceBtn btn btn-sm btn-outline-primary">✏️</button>
  //         <button class="deleteExperienceBtn btn btn-sm btn-outline-danger">🗑️</button>
  //       </td>
  //     `;
  //     tableBody.appendChild(row);
  //   }

  //   closeExperienceForm();
  // });

  // // إلغاء
  // document.getElementById("cancelExperienceBtn").addEventListener("click", closeExperienceForm);

  // function closeExperienceForm() {
  //   document.getElementById("ExperienceForm").style.display = "none";
  // }

  // // تفعيل التعديل والحذف
  // document.getElementById("ExperienceTableBody").addEventListener("click", function (e) {
  //   const row = e.target.closest("tr");

  //   if (e.target.classList.contains("editExperienceBtn")) {
  //     editExperienceIndex = row.rowIndex - 1;
  //     document.getElementById("inputExperience").value = row.cells[0].innerText;
  //     document.getElementById("Experiencefrom").value = row.cells[1].innerText;
  //     document.getElementById("ExperienceTo").value = row.cells[2].innerText;
  //     document.getElementById("ExperienceForm").style.display = "block";
  //     checkExperienceForm();
  //   }

  //   if (e.target.classList.contains("deleteExperienceBtn")) {
  //     row.remove();
  //   }
  // });

 