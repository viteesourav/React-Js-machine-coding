// Writing an iify to handle the Logic...
(async function () {
    let empData = [];
    // Fetch my employee data...
    const resp = await fetch("../utils/data.json");
    const data = await resp.json();
  
    empData = [...data];
  
    let selectedEmpData = empData[0];
  
    //DOM selectors for the employeeList and employeeInfo div...
    const empList = document.querySelector(".employees__names--list");
    const empInfo = document.querySelector(".employees__info--detail");
  
    // Logic to render emp Lists...
    const renderEmpList = () => {
      empList.innerHTML = "";
  
      empData.forEach((emp) => {
        const employee = document.createElement("span");
        employee.classList.add("employees__names--tag");
        if (parseInt(selectedEmpData.employee_id) === emp.employee_id) {
          employee.classList.add("tagged");
        }
        employee.setAttribute("id", emp.employee_id);
        employee.innerHTML = `${emp.first_name} ${emp.last_name} <i class="employeesDelete">❌</i>`;
        empList.append(employee);
      });
    };
    renderEmpList();

    //function to handle the re-render of the Page...
    const handleRenderPage = () => {
      renderEmpList();
      showEmpDetails();
    }
  
    //Logic to display the selected Emp Info...
    //NOTE: here the event listner is on a div, then based on where we click it will act...
    empList.addEventListener("click", (evt) => {
      // console.log(evt);
      // Handle click on selected Name...
      if (evt.target.tagName === "SPAN" && parseInt(evt.target.id) !== selectedEmpData.employee_id) {
        const selectedEmpId = parseInt(evt.target.id);
        selectedEmpData = empData.find(ele => ele.employee_id === selectedEmpId);
        handleRenderPage();
      }
  
      //Handle click on close btn Icons...
      if(evt.target.tagName === "I") {
        const selectedEmpId = parseInt(evt.target.parentElement.id);
        empData = empData.filter(ele => ele.employee_id !== selectedEmpId);
        selectedEmpData = empData.length > 0 ? empData[0] : '';
        handleRenderPage();
        console.log('This employee has to be deleted');
      }
    });

    //Handle Rending selected Employee details...
    const showEmpDetails = () => {
      if(!selectedEmpData) {
        empInfo.innerHTML = '';
        return;
      }
      empInfo.innerHTML = `
        <img src="${selectedEmpData.imageUrl}">
        <span class="employees__info--heading">${selectedEmpData.first_name} ${selectedEmpData.last_name}</span>
        <span>JobDetails - ${selectedEmpData.job_title}</span>
        <span>Age - ${selectedEmpData.age}</span>
        <span>Gender - ${selectedEmpData.gender}</span>
        <span>DOB - ${selectedEmpData.dob}</span>
      `
    };
    showEmpDetails();

    //Handle Adding a new Employee...
    const addEmpBtn = document.querySelector('.addEmployee__btn');
    const addEmpModal = document.querySelector('.addEmployee');
    const addEmpFrm = document.querySelector('.addEmployee__frm');

    //Handle Opening and closing of the modal...
    addEmpBtn.addEventListener('click', (evt) => {
      addEmpFrm.querySelector('button').innerHTML = "Add";
      addEmpModal.style.display = 'flex';
    })

    addEmpModal.addEventListener('click', (evt) => {
      if(evt.target.className == "addEmployee") {
        addEmpModal.style.display = 'none';
        document.querySelector('.addEmployee__frm').reset();
      }
    })

    // Handle on submit of the form, Pass Form DOM directly to new FormData() to extract the data...
    addEmpFrm.addEventListener('submit', (evt) => {
      evt.preventDefault();  //prevents default behavior of frm submit action...

      //handle frmData with DOM and new FormData Object...
      const frmData = new FormData(addEmpFrm);
      const frmEntries = [...frmData.entries()];

      //First check if we are adding or Editiing....
      if(addEmpFrm.querySelector('button').innerHTML === "Edit") {
        //Modifying the entires in the selectedEmpData and Modifying the entries in the dataObj...
        empData = empData.map(empObj => {
          if(empObj.employee_id == selectedEmpData.employee_id) {
            frmEntries.forEach(([key, value]) => {
              if(empObj[key]) {
                empObj[key] = value;
              }
            });
            selectedEmpData = empObj;
          }
          return empObj;
        })
      } else {
        let newEmpObj = {};
        frmEntries.forEach(([key, value]) => {
          newEmpObj[key] = value;
        })
        newEmpObj.employee_id = empData.length + 1;
        if(!newEmpObj.imageUrl)
          newEmpObj.imageUrl = "https://www.vhv.rs/dpng/d/426-4264903_user-avatar-png-picture-avatar-profile-dummy-transparent.png";
        
        empData = [newEmpObj, ...empData];
        selectedEmpData = empData[0];
      }
     
      handleRenderPage();
      addEmpModal.style.display = 'none'; //After adding new Data, hide the modal..
      addEmpFrm.reset();  //Reset the frm DOM Node..
    })

    //TODO: Implementing an Edit functionality...
    const btnEdit = document.querySelector('.employees__info--btnEdit');

    btnEdit.addEventListener('click', () => {
      
      //First lets bring the form DOM and create a Form Object...
      console.log(selectedEmpData);
      // console.log([...editFrmData], ...editFrmData.entries());
      
      //Lets try to set the data in the editFrmData FormObj based on selectedEmpData..
      Object.entries(selectedEmpData).forEach(([key, value]) => {
        if(addEmpFrm.elements[key]) {
          if(key === 'dob') {
            let formatDate = new Date(selectedEmpData[key]);
            addEmpFrm.elements[key].value = `${formatDate.getFullYear()}-${(formatDate.getMonth() + 1) < 10 ? "0" + (formatDate.getMonth() + 1) : (formatDate.getMonth() + 1) }-${formatDate.getDate() < 10 ? "0"+formatDate.getDate() : formatDate.getDate()}`;
          } else {
            addEmpFrm.elements[key].value = selectedEmpData[key];
          }
        }
      })

      //Open the model...
      addEmpModal.style.display = 'flex';

      //Update the btn Text to edit...
      addEmpFrm.querySelector('button').innerHTML = "Edit";

    })

  })();
  