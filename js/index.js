;(function(global){
   var AddressBook = function(name,phone,email){
     return new AddressBook.init(name,phone,email);
   };
   
   AddressBook.prototype = {
     //default functions
     data:[
       //add data here
     ],
     searchResults:[
       
     ],
     addNewContact:function(name,phone,email){
       this.data.push({
         name: name,
         phone: phone,
         email:email
       });
       return this;
     },
     save:function(){
       //save to local storage. This isn't hugely necessary
  //      var inputText = $("#text-title").val();
	// // var contact = $("#text-body").val();
	 window.localStorage.setItem('contact', form);
	// window.localStorage.setItem('Message', bodyText);
AddressBook.clear();
       
     },
     returnAll:function(){
       return this.data;
     },
     displayData:function(){
       this.log(this.data);
       return this;
     },
     log:function(data){
       console.log(data);
       return this;
     },
     search:function(searchTerm){
       if(this.data.length){
         for(var i=0;i<this.data.length;i++){
           if(this.data[i].name.toLowerCase() == searchTerm.toLowerCase()){
             console.error(this.data[i]);
             this.searchResults.push(this.data[i]);
           }
         }
         
         return this.searchResults;
       }else{
         console.log("There are no results");
       }
       return this;
     },
     lastResults:function(){
       return this.searchResults;
     }
   } 
   
   AddressBook.init=function(name,phone,email){
     var self = this;
     //set up the address book
     if(name || phone || email){
       self.addNewContact(name || "", phone||"", email||"");
     }
     
   }
   
   AddressBook.init.prototype = AddressBook.prototype;
  
  global.AddressBook = $ab = AddressBook;
})(window);

if(!window.contactList){ //check if we already have a contact list
   window.contactList=$ab();
  }

var form  = document.getElementById('contact');
form.addEventListener('submit', function(){
   if(!window.contactList){ //check if we already have a contact list
   window.contactList=$ab(form.person.value,form.phone.value,form.email.value);
  } else {
  //saves new values rather than deleting old ones as well
    contactList.addNewContact(form.person.value,form.phone.value,form.email.value);
  }
  
    form.person.value = '';
    form.phone.value = '';
    form.email.value = '';
  
   event.preventDefault();
});

var searchForm = document.getElementById('search');
searchForm.addEventListener('submit', function(){
  var results;
  if(results !== undefined){
    results = null;
  }
  if(!window.contactList){
    window.contactList = $ab();
  }else{
    results = contactList.search(searchForm.search.value);
  }
  document.getElementById('results').innerHTML = '';
  if(results.length>0){
    
    for(var i = 0;i<results.length;i++){
      document.getElementById('results').innerHTML += '<div class="contact-item">Name:&nbsp; &nbsp; &nbsp'+results[i].name+'<br>Phone:&nbsp; &nbsp; &nbsp'+results[i].phone+'<br>Email: &nbsp; &nbsp; &nbsp; &nbsp;'+results[i].email+'</div><hr>';
    }
  } else{
   document.getElementById('results').innerHTML += '<div class="contact-item">There are no results for this name</div><hr>';
  }
  
  //do something with the results
  event.preventDefault();
});

document.getElementById('js-show-all').addEventListener('click', function(){
  if(window.contactList){ //check if we already have a contact list
     document.getElementById('show-panel').innerHTML = '';
   var contacts = contactList.returnAll();
    console.log(contacts);
    if(contacts.length>0){
      for(var i = 0;i<contacts.length;i++){
      document.getElementById('show-panel').innerHTML += '<div class="contact-item">Name &nbsp; &nbsp;&nbsp;:&nbsp;&nbsp;'+contacts[i].name+'<br>Phone &nbsp;&nbsp;: &nbsp;&nbsp;'+contacts[i].phone+'<br>Email  &nbsp;&nbsp; : &nbsp;&nbsp;'+contacts[i].email+'&nbsp;&nbsp;<button id="edit">EDIT</button> &nbsp;&nbsp;<button id="edit">DELETE</button></div><hr>';
      }
    }else{
      document.getElementById('show-panel').innerHTML += '<div class="contact-item">No Contacts</div><hr>';
    }
  }
  document.getElementById('show-panel').style.display = 'block';
  
  document.getElementById('search-panel').style.display = 'none';
  document.getElementById('contact-panel').style.display = 'none';
});

document.getElementById('js-search').addEventListener('click', function(){
  document.getElementById('show-panel').style.display = 'none';
  document.getElementById('search-panel').style.display = 'block';
  document.getElementById('contact-panel').style.display = 'none';
});

document.getElementById('js-add-new').addEventListener('click', function(){
  document.getElementById('show-panel').style.display = 'none';
  document.getElementById('search-panel').style.display = 'none';
  document.getElementById('contact-panel').style.display = 'block';
});