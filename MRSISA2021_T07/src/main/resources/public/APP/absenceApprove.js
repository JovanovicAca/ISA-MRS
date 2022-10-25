Vue.component("AbsenceApprove", {
    data: function() {
        return {
            headers: ['Doctor name', 'Doctor email', 'Description', 'From', 'To', 'Approved'],
            allAbsences: [],
            absenceId: '',
            email: '',
        }
    },
    template: ` 
    <div>
    <div class="wrapabsence">
    <h2>Absences</h2>  
        <div class="table-absence">
        
            <div class="table1-absences">  
                <table id="tableAbsences" border="1">
                <thead>
                    <tr>
                        <th v-for="header in headers">
                            {{header}}
                         
                        </th>
                        <th>
                        <input type="checkbox" id="checkAbsence" v-on:click="onlyApproved($event)">
                        <label for="checkAbsence">Only not approved</label>   
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if v-for="item in allAbsences">
                        <td>{{item.doctor.name + item.doctor.surname}}</td>
                        <td>{{item.doctor.email}}</td>
                        <td>{{item.description}}</td>
                        <td>{{item.startDate}}</td>
                        <td>{{item.endDate}}</td>
                        <td v-if="item.approved">Approved</td>
                        <td v-else>Not Approved</td>
                        <td v-if="!item.approved"><button v-on:click="approveAbsence(item.id,item.doctor.email)">Approve this</button></td>
                        <td v-else><button  v-on:click="disapproveAbsence(item.id,item.doctor.email)">Disapprove this</button></td>   
                    </tr>  
                </tbody>      
                </table>
            </div>    
        </div>  
        <div class="buttonback">
        <button v-on:click="goBack()">Home</button>    
    </div>
        
    </div>    
    <div id="text-reason" style="display:none">
            <label for="textarea-reason">Reason:</label>
            <textarea id="textarea-reason"></textarea>
            <button v-on:click="disapprove">Submit</button>
        </div>
    </div>		  
    	`,
    methods: {
        goBack: function() {
            this.$router.push('/pharmaAdminHome')
        },
        onlyApproved: function() {
            if (event.target.checked) {
                axios
                    .get("/absence/getAllNotApproved")
                    .then(response => {
                        this.allAbsences = response.data
                    })
            } else {
                this.takeAll()
            }

        },
        takeAll: function() {
            axios
                .get("/absence/getAllAbsences")
                .then(response => {
                    this.allAbsences = response.data
                })
        },
        approveAbsence: async function(id, email) {
            this.email = email
            await axios
                .put("/absence/approveAbsence/" + id + "/" + this.email)
                .then(response => {
                    if (response.data === "success") {
                        for (var i = 0; i < this.allAbsences.length; i++) {
                            if (this.allAbsences[i].id === id) {
                                this.allAbsences[i].approved = "Approved"
                            }
                        }
                        swal("Succes!", "Good job!", "success");
                    }
                })

        },
        disapproveAbsence: function(id, email) {
            document.getElementById("text-reason").style.display = "block";
            this.absenceId = id
            this.email = email
        },

        disapprove: async function() {
            if (document.getElementById("textarea-reason").value == '') {
                swal("Error!", "Reason can't be empty!", "error");
                return;
            }
            var reason = document.getElementById("textarea-reason").value

            //console.log(reason)
            await axios

                .put("/absence/disapproveAbsence/" + this.absenceId + "/" + this.email + "/" + reason)
                .then(response => {
                    if (response.data === "success") {
                        for (var i = 0; i < this.allAbsences.length; i++) {
                            if (this.allAbsences[i].id === this.absenceId) {
                                this.allAbsences[i].approved = "Not Approved"
                            }
                        }
                        swal({
                            title: "Success!",
                            text: "Absence dissapproved!",
                            type: "success"
                        }).then(function() {
                            location.reload()
                        });
                        document.getElementById("text-reason").style.display = "none";
                    }
                })
        },
    },
    beforeMount() {
        this.user = JSON.parse(localStorage.getItem('user'))
        try {
            if (this.user.role != "ADMIN") {
                if (this.user.role === "SUPPLY") {
                    this.$router.push("/supplierHome")
                }
                if (this.user.role === "PATIENT") {
                    this.$router.push("/patientHome")

                }
                if (this.user.role === "PHARMA") {
                    this.$router.push("/employeeHome")
                }
                if (this.user.role === "DERMA") {
                    this.$router.push("/employeeHome")
                }
            } else {
                if (this.user.adminType === "SYSTEM") {
                    console.log('aa')
                    this.$router.push("/systemAdminHome")
                }
            }
        } catch {
            this.$router.push("/")
        }
    },
    mounted() {
        this.takeAll()
    }
});