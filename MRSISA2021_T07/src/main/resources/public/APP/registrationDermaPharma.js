Vue.component("RegisterDermaPharma", {
    data: function() {
        return {
            dermatologist: {
                name: "",
                surname: "",
                email: "",
                password: "",
                address: "",
                city: "",
                country: "",
                number: "",
                role: "DERMA",

            },
            pharmacist: {
                name: "",
                surname: "",
                email: "",
                password: "",
                address: "",
                city: "",
                country: "",
                number: "",
                role: "PHARMA",

            },
            startTime: "",
            endTime: "",
            startTimeP: "",
            endTimeP: "",
            id: "",
            regDermaCheck: true,
            regPharmaCheck: false,
        }
    },


    template: ` 
		<div>
        <div class="page-pharmainfo">
            <nav class="page__menu-pharmainfo menu">
            <ul class="menu__list-pharmainfo r-list">
                <li class="menu__group-pharmainfo"><a v-on:click="regDerma()" class="menu__link-pharmainfo r-link text-underlined">Register dermatologist</a></li>
                <li class="menu__group-pharmainfo"><a v-on:click="regPharma()" class="menu__link-pharmainfo r-link text-underlined">Register pharmacist</a></li>
            </ul>
            </nav>
        </div>
		<div class="formReg" v-show="regDermaCheck">
		<h1> Register Dermatologist </h1>
			
	
			 <table id="tabelaDerma">
                    <tr>
                        <td>Name: </td>
                        <td><input type="text" name="ime" v-model="dermatologist.name"></td>
                    </tr>
                    <tr>
                        <td>Surname: </td>
                        <td><input type="text" v-model="dermatologist.surname"></td>
                    </tr>
                    <tr>
                        <td>Email: </td>
                        <td><input type="text" v-model="dermatologist.email"></td>
                    </tr>
                    <tr>
                        <td>Password: </td>
                        <td><input type="text" v-model="dermatologist.password"></td>
                    </tr>
                    <tr>
                        <td>Address: </td>
                        <td><input type="text" v-model="dermatologist.address"></td>
                    </tr>
                    <tr>
                        <td>City: </td>
                        <td><input type="text" v-model="dermatologist.city"></td>
                    </tr>
                    <tr>
                        <td>Country: </td>
                        <td><input type="text" v-model="dermatologist.country"></td>
                    </tr>
                    <tr>
                        <td>Number: </td>
                        <td><input type="text" v-model="dermatologist.number"></td>
                    </tr>
                    <tr>
                        <td>Works from (h):</td>
                        <td><input type="number" v-model="startTime" step="1" min="0" max="24"></td>	 	    
                        <td>Works to (h):</td>
                        <td><input type="number" v-model="endTime" step="1" min="0" max="24"></td>	 				
                    </tr>
                
                <div class="buttonsSuBack">	 
                
                        <button type = "submit" v-on:click="submitForm()" class="but">Register</button>
                    
                        <button type = "submit" v-on:click="back()" class="back">Home</button>
                
                </div>	
			</table>
	 	    
		 </div>		
         <div class="formReg" v-show="regPharmaCheck">
		<h1> Register Pharmacist </h1>
			
	
			 <table id="tabelaPharma">
                    <tr>
                        <td>Name: </td>
                        <td><input type="text" name="ime" v-model="pharmacist.name"></td>
                    </tr>
                    <tr>
                        <td>Surname: </td>
                        <td><input type="text" v-model="pharmacist.surname"></td>
                    </tr>
                    <tr>
                        <td>Email: </td>
                        <td><input type="text" v-model="pharmacist.email"></td>
                    </tr>
                    <tr>
                        <td>Password: </td>
                        <td><input type="text" v-model="pharmacist.password"></td>
                    </tr>
                    <tr>
                        <td>Address: </td>
                        <td><input type="text" v-model="pharmacist.address"></td>
                    </tr>
                    <tr>
                        <td>City: </td>
                        <td><input type="text" v-model="pharmacist.city"></td>
                    </tr>
                    <tr>
                        <td>Country: </td>
                        <td><input type="text" v-model="pharmacist.country"></td>
                    </tr>
                    <tr>
                        <td>Number: </td>
                        <td><input type="tel" v-model="pharmacist.number"></td>
                    </tr>
                    <tr>
                        <td>Works from (h):</td>
                        <td><input type="number" v-model="startTimeP" step="1" min="0" max="24"></td>	 	    
                        <td>Works to (h):</td>
                        <td><input type="number" v-model="endTimeP" step="1" min="0" max="24"></td>	 				
                    </tr>
                
                <div class="buttonsSuBack">	 
                
                        <button type = "submit" v-on:click="submitFormP()" class="but">Register</button>
                    
                        <button type = "submit" v-on:click="back()" class="back">Home</button>
                
                </div>	
			</table>
	 	    
		 </div>		
	 </div>		  
	 `,
    methods: {
        regDerma: function() {
            this.regDermaCheck = true
            this.regPharmaCheck = false
        },
        regPharma: function() {
            this.regDermaCheck = false
            this.regPharmaCheck = true
        },
        submitForm: async function() {
            var bool = false
            pharmaId = JSON.parse(localStorage.getItem('user')).works
            if (this.endTime === this.startTime) {
                swal("Error!", "Start time and end time can't be the same!", "error");
                return;
            }
            if (this.endTime > 24 || this.startTime > 24) {
                swal("Error!", "Hours can't be higher than 24!", "error");
                return;
            }
            if (!this.isNumber(this.dermatologist.number)) {
                swal("Error!", "Number must be a number!", "error");
                return;
            }
            //console.log("a")
            await axios
                .post("/admin/registerDermatologist1/", this.dermatologist)
                .then(response => {
                    if (response.data === "Dermatologist already registered") {
                        bool = false
                        this.makeEmployment()
                    } else if (response.data === "Success") {
                        bool = true
                    }
                }).catch((error) => {
                    swal("Error!", error.response.data, "error");
                })


            if (bool) {
                this.makeEmployment(pharmaId)

            }
            return;
        },
        isNumber: function(n) {
            return !isNaN(parseFloat(n)) && !isNaN(n - 0)
        },
        submitFormP: async function() {
            var bool = false
            pharmaId = JSON.parse(localStorage.getItem('user')).works
            if (this.endTimeP === this.startTimeP) {
                swal("Error!", "Start time and end time can't be the same!", "error");
                return;
            }
            if (this.endTimeP > 24 || this.startTimeP > 24) {
                swal("Error!", "Hours can't be higher than 24!", "error");
                return;
            }
            if (!this.isNumber(this.pharmacist.number)) {
                swal("Error!", "Number must be a number!", "error");
                return;
            }
            await axios
                .post("/admin/registerPharmacist1", this.pharmacist)
                .then(response => {
                    if (response.data === "Pharmacist already registered") {
                        bool = false
                        swal("Error!", "Email taken!", "error");
                        //this.makeEmploymentP()
                    } else if (response.data === "Success") {
                        bool = true
                    }
                }).catch((error) => {
                    swal("Error!", "error", "error");
                })

            if (bool) {
                this.makeEmploymentP(pharmaId)
            }
            return;
        },
        back: function() {
            this.user = JSON.parse(localStorage.getItem('user'))
                //alert(this.user.adminType)
            if (this.user.adminType === "SYSTEM") {
                this.$router.push("/systemAdminHome")
            } else {
                this.$router.push("/pharmaAdminHome")
            }
        },
        makeEmployment: async function() {
            var dto = new Object();
            dto.startH = this.startTime
            dto.endH = this.endTime
            dto.pharmaId = pharmaId
            dto.email = this.dermatologist.email
                //alert(this.dermatologist.email + pharmaId)
            await axios
                .post("/employee/makeEmployee/1", dto)
                .then(response => {
                    if (response.data === "Success") {
                        swal("Succes!", "Dermatologist added", "success");
                    }
                }).catch((error) => {
                    //console.log(error.response.data)
                    swal("Error!", error.response.data, "error");
                })
        },
        makeEmploymentP: async function() {
            var dto = new Object();
            dto.startH = this.startTime
            dto.endH = this.endTime
            dto.pharmaId = pharmaId
            dto.email = this.pharmacist.email
                //alert(this.dermatologist.email + pharmaId)
            await axios
                .post("/employee/makeEmployee/2", dto)
                .then(response => {
                    if (response.data === "Success") {
                        swal("Succes!", "Pharmacist added", "success");
                    }
                }).catch((error) => {
                    swal("Error!", error.response.data, "error");
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

});