Vue.component("NewAppointmentDerma", {
    data: function() {
        return {
            name: "",
            email: "",
            calendar: null,
            app: {

            },
            dermaExist: -1,
        }
    },

    template: ` 
<div>
    <div class="mainWrapDermaApp">
        <div style="text-align: center;">
            <h1>Make appointment for dermatologist</h1>
            
        </div>

        <div class="appointmentFormaData">
            <h2 id="dataInput">Enter data</h2>
            <div class="col-12">
            <table id="tableForma">
                <tr>
                    <td>Enter dermatologist's email address:</td>
                    <td><input v-model="email" type="email"/></td>
                </tr>
                
                <tr>
                    <td colspan="2" style="text-align:center"><button v-on:click="checkCalendar()">Check dermatologists working calendar</button></td>
                </tr>
                <tr>
                    <td>Choose date and start time:</td>
                    <td><input v-model="app.date" type="datetime-local"/></td>
                </tr>
               
                <tr>
                    <td>Duration (minutes): </td>
                    <td><input v-model="app.duration" type="number" step="5" min="15" max="120"/>min</td>
                </tr>
               
                <tr>
                    <td>Enter price: </td>
                    <td><input v-model="app.price" type="number"  min="100" max="100000"/> din.</td>  
                </tr>
              
                <tr>
                    <td colspan="2" style="text-align:center"><button v-on:click="makeAppointment()">Make appointment</button></td>
                </tr>
           </table>     
            </div>
        </div>
        
        <div class="calendar-derma">
            <h2 id="titleCalendar" style="display:none">Dermatologist calendar</h2>
            <div id="calendar-main" style="display:none">
                <div id="calendar">
                </div>
            </div>
        </div>
        <div class="buttonback">
            <button v-on:click="goBack" id="buttonBackApp">Back</button>
        </div>
    </div>    
</div>	  
`,
    methods: {
        goBack: function() {
            this.$router.push('/pharmaAdminHome')
        },
        checkCalendar: async function() {
            if (this.email === "") {
                swal("Error!", "Dermatologist does not exist!", "error");
                return false;
            }
            var id = JSON.parse(localStorage.getItem('user')).id
            await axios
                .get("/derma/getDermatologistEmail1/" + this.email + "/" + id)
                .then(response => {
                    this.dermaExist = response.data;
                    if (this.dermaExist === -1) {
                        swal("Error!", "Dermatologist doesnt exist!", "error");
                        return false;
                    }
                    var c1 = document.getElementById("titleCalendar");
                    c1.style.display = "block";
                    var c2 = document.getElementById("calendar-main");
                    c2.style.display = "block";
                    var arr = this.calendar.getEvents();
                    console.log(arr.length)
                    this.calendar.removeAllEvents();
                    this.getData(this.calendar);
                    this.calendar.render();

                })
        },

        getData: async function(cal) {
            await axios
                .get("/derma/getDermaAppointments/" + this.email)
                .then(response => {
                    //console.log(response.data)
                    this.app = response.data
                    this.app.forEach(function(el) {
                        if (el.patient === null) {
                            this.name = "Nedodeljen termin"
                        } else {
                            this.name = el.patient
                        }
                        let event = cal.addEvent({
                            id: el.id,
                            title: this.name,
                            start: el.startTime,
                            end: el.endTime,
                            address: el.address,
                            element: el,
                        });

                    })
                })

        },

        makeAppointment: async function() {
            var id = JSON.parse(localStorage.getItem('user')).id
            if (!this.email || !this.app.date || !this.app.duration || !this.app.price) {
                swal("Error!", "Please input all the values!", "error");
                return false;
            } else {
                var newApp = new Object();
                newApp.startTime = this.app.date;
                newApp.endTime = moment(this.app.date).add(this.app.duration, 'm').toDate();
                console.log(newApp.endTime)
                newApp.price = this.app.price;
                await axios
                    .post("/derma/makeAppointment/" + this.email + "/" + id, newApp)
                    .then((response) => { swal("Succes!", response.data, "success"); })
                    .catch((error) => {
                        //alert(error.response.data)
                        swal("Error!", error.response.data, "error");
                    })
                var c1 = document.getElementById("titleCalendar");
                c1.style.display = "block";
                var c2 = document.getElementById("calendar-main");
                c2.style.display = "block";

                this.calendar.removeAllEvents();
                this.getData(this.calendar);
                this.calendar.render();
            }
        }
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
        var cal = document.getElementById('calendar');
        var today = new Date();
        this.calendar = new FullCalendar.Calendar(cal, {
            height: 'auto',
            initialView: 'dayGridMonth',
            nowIndicator: true,
            initialDate: today,
            headerToolbar: {
                left: 'prev, next, today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
            },
        });
    },
    components: {
        vuejsDatepicker
    },
});