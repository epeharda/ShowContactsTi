var win = Titanium.UI.createWindow();
var table = Ti.UI.createTableView();


//checking authorization to access contacts
if (Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_AUTHORIZED){
    loadContacts();
} else if (Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_UNKNOWN){
    Ti.Contacts.requestAuthorization(function(e){
        if (e.success) {
            loadContacts();
        } else {
            contactsDisallowed();
        }
    });
} else {
     contactsDisallowed();
}
function contactsDisallowed(){
	Ti.API.info('User did not approve use of contacts');
};
//executing result of access request

function loadContacts(){
	Ti.API.info('User approved use of contacts');
	var contacts = Ti.Contacts.getAllPeople();
	var data = [];
    for (var i = 0; i < contacts.length; i++) {
        var title = contacts[i].fullName;
        if (!title || title.length === 0) {
            title = "(no name)";
        }
        var row = Ti.UI.createTableViewRow({
            title: title
        });
        row.rowId=i;
        row.myText=title;
        data.push(row);
    }
    table.data = data;
};
table.addEventListener('click', selectRow);

function selectRow(e){
	var rowId = e.rowData.rowId;
	var contacts = Ti.Contacts.getAllPeople();
	var person = contacts[rowId];
	var phone;
	try{
		phone = "mobile:" + person['phone'].mobile[0];
	}
	catch(e){
		phone = "mobile: (none)";
	}
	
	try{
		phone = phone + "\nhome: " + person['phone'].home[0];
	}
	catch(e){
		phone = phone + "\n" + "home: (none)";
	}
	try{
		phone = phone + "\nwork: " + person['phone'].work[0];
	}
	catch(e){
		phone = phone + "\n" + "work: (none)";
	}
	try{
		phone = phone + "\nother: " + person['phone'].other[0];
	}
	catch(e){
		phone = phone + "\n" + "other: (none)";
	}
	alert(phone);
}

win.add(table);
win.open();