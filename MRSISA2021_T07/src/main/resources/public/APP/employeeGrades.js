Vue.component("EmployeeGrades", {
    data: function() {
        return {
            user: {
                name: "",
                surname: "",
                address: "",
                email: "",
                role: "",
                grade: ""
            },
            headers: ['Role', 'Email', 'Grade', 'Delete'],
            admin: {
                works: "",
            },
            email: "",
            map: null,
            adminEmail: "",
            listaZaposlenih: [],
            existingData: [],
        }
    },

    template: ` 
    		<div id="search-div">
	    	<link rel="stylesheet" href="CSS/employeeGrades.css" type="text/css">
	    	
		        <h1 id="h1-search">Veiw Pharmacist/Dermatologist grades</h1>
		    		
		    		<form class="example" @submit.prevent = "findTableData">
					  <input type="text" v-model="email" placeholder="Search pharmacists/dermatologists by email" name="search">
					  <button type="submit" v-on:click="clearTableData">Search</button>
					</form>		    		
					<h2 id="prazan1"> </h2>
                    <div class="tableWorkersWrap">
           
			    	<table id="tableWorkers" cellspacing="0" cellpadding="0" border="0" width=600px class = "center">
					<thead>
                        <tr>
                            <th v-for="header in headers">
                                {{header}}
                            </th>
                        </tr>
                    </thead>  
                    <tbody>
                        <template v-for="item in listaZaposlenih">
                            <tr>
                                <td v-if="item.doctor.role=='DERMA'">Dermatologist</td>
                                <td v-else>Pharmacist</td>
                                <td>{{item.doctor.email}}</td>
                                <td>{{item.doctor.rating}}</td> 
                                <td><button v-on:click="deleteWorker(item.doctor.email,item.doctor.role)">Delete</button></td>
                                  
                            </tr>  
                        </template>
                    </tbody>  
                       
					</table>
                    </div>
					<button id="dugmici" type="submit" v-on:click="addNewDerma()">Add new Dermatologist</button>
					<button id="dugmici" type="submit" v-on:click="addNewDerma()">Add new Pharmacist</button>
	  
            
	    	<button id="btn" type="submit" v-on:click="goHome">Home Page</button>
</div>		  
`,
    methods: {
        addNewDerma: function() {
            this.$router.push('/registrationDermaPharma')
        },
        edit: function() {
            var id = JSON.parse(localStorage.getItem('user')).works

            axios
                .get('/report/getAverageDoctor/' + id)
                .then(response => {
                    //console.log(response.data)
                    this.listaZaposlenih = response.data;

                }).catch((error) => {
                    swal("Error!", error.response.data, "error");
                })


        },

        deleteWorker: function(email, role) {
            var bool = false
            swal({
                    title: "Are you sure?",
                    //text: "Password will be changed on next login!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        axios
                            .delete('/pharma/deleteWorker/' + email + "/" + role)
                            .then(response => {
                                if (response.data === "success") {
                                    for (var i = 0; i < this.listaZaposlenih.length; i++) {
                                        if (this.listaZaposlenih[i].doctor.email === email) {
                                            this.listaZaposlenih.splice(i, 1);
                                        }
                                    }
                                }
                                swal("Succes!", "Doctor deleted", "success");
                            }).catch((error) => {
                                swal("Error!", error.response.data, "error");
                            })

                    } else {

                        swal("Doctor not deleted!");
                    }
                });
            return;
        },
        addTableData: function(element) {
            var table = document.getElementById("stocic");
            var row = table.insertRow(0);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.innerHTML = element.role;
            cell2.innerHTML = element.email;
            cell3.innerHTML = element.name;
        },
        clearTableData: function() {
            var found = document.getElementById("prazan1");
            found.innerHTML = "";
            for (var i = 0; i < this.listaZaposlenih.length; i++) {
                document.getElementById("stocic").deleteRow(0);
            }
            let foundUser;
            let x = false;
            for (var i = 0; i < this.listaZaposlenih.length; i++) {
                if (this.listaZaposlenih[i].email != this.email) {
                    this.addTableData(this.listaZaposlenih[i]);
                    x = true;
                } else {
                    foundUser = this.listaZaposlenih[i];
                    x = false;
                }
            }
            if (x) {
                found.innerHTML = "Nema Farmaceuta sa tom mejl adresom.";
            }
            for (var i = 0; i < this.listaZaposlenih.length; i++) {
                if (this.listaZaposlenih[i].email == foundUser.email) {
                    found.innerHTML = "";
                    this.addTableData(foundUser);
                }
            }

        },
        goHome: function() {
            this.$router.push("/pharmaAdminHome")
        }
    },
    mounted: function() {
        this.edit();
    }

});