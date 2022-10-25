Vue.component("PatientHistory", {
    data: function() {
        return {
            pastAppos : [],
            goodAppos: [],
            badAppos: [],
            goodConsults: [],
            badConsults: [],
            qConsults: [],
            questionAppos: [],
            pastConsults: [],
            pastMedication: [],
            goodMedics : [],
            badMedics: [],
            drugAppointments: [],
            currentDrugAppos: [],

            email: "",

            doctor : "",
            pharmacy: "",
            price: "",
            date: "",
            appeared: "",
            report: "",
            startTime: "",
            endTime: "",
            quantity: "",
            drugName: "",
            drugShape: "",
            drugType: "",
            drugRecieved: "",
        }
    },

    template: `
	    <div id="history-mainDiv">
            <link rel="stylesheet" href="CSS/patientHistory.css" type="text/css">

	    	<div id="history-dugmici">
                <button class="history-button"  type="submit" v-on:click="appointmentHistory()">Appointment History</button>
                <button class="history-button"  type="submit" v-on:click="consultationHistory()">Consultation History</button>
                <button class="history-button"  type="submit" v-on:click="drugOrders()">Medication Order History</button>
                <button class="history-button" id="homeBtn"  type="submit" v-on:click="patientMenu()">Go Home</button>
            </div>

            <div id="history-content">
                <div id="history-consult">
                    <div id="history-consult-levo">
                        <h1> Past Consultations </h1>
                        <div id="history-consult-box">
                        <div v-for="consult in goodConsults" v-on:click="viewAppo(consult)" :class="[consult.selected ? 'appo-selected' : 'appo-appeared']">
                            <div class = "resAppo-image" style="background-image: url(RES/IMG/calendar.png)"></div>
                                <div class= searchPharma-text>
                                    <ul>
                                        <li> Pharmacy: {{consult.pharmacyName}} </li>    
                                        <li> Doctor: {{consult.doctor}} </li>                                    
                                        <li> Price: {{consult.price}} $ </li>
                                        <li> Date: {{consult.datum}} </li>
                                        
                                    </ul>
                                </div>
                            </div >
                            <div v-for="consult in badConsults" v-on:click="viewAppo(consult)" :class="[consult.selected ? 'appo-deniedSelect' : 'appo-denied']">
                                <div class = "resAppo-image" style="background-image: url(RES/IMG/calendar.png)"></div>
                                    <div class= searchPharma-text>
                                        <ul>
                                            <li> Pharmacy: {{consult.pharmacyName}} </li>    
                                            <li> Doctor: {{consult.doctor}} </li>                                    
                                            <li> Price: {{consult.price}} $ </li>
                                            <li> Date: {{consult.datum}} </li>
                                            
                                        </ul>
                                    </div>
                            </div >
                            <div v-for="consult in qConsults" v-on:click="viewAppo(consult)" :class="[consult.selected ? 'appo-questionSelect' : 'appo-question']">
                                <div class = "resAppo-image" style="background-image: url(RES/IMG/calendar.png)"></div>
                                    <div class= searchPharma-text>
                                        <ul>
                                            <li> Pharmacy: {{consult.pharmacyName}} </li>    
                                            <li> Doctor: {{consult.doctor}} </li>                                    
                                            <li> Price: {{consult.price}} $ </li>
                                            <li> Date: {{consult.datum}} </li>
                                            
                                        </ul>
                                    </div>
                            </div >
                        </div>
                    </div>
                    <div id="history-consult-desno">
                        <h1> Consultation Information </h1>
                        <div id="history-consult-desnoLevo">
                            <h2> Pharmacist </h2>
                            <input class="history-input" v-model="doctor" type="text" readonly/>
                            <h2> Date </h2>
                            <input class="history-input" v-model="date" type="text" readonly/>
                            <h2> Patient Appeared </h2>
                            <input class="history-input" v-model="appeared" type="text" readonly/>
                            <h2> Time Duration </h2>
                            <input class="history-input" v-model="startTime" type="text" readonly/>
                            <h2> Report </h2>
                            <input class="history-input" v-model="report" type="text" readonly/>
                        </div>
                        <div id="history-consult-desnoDesno">
                            <h2> Pharmacy Name </h2>
                            <input class="history-input" v-model="pharmacy" type="text" readonly/>
                            <h2> Price </h2>
                            <input class="history-input" v-model="price" type="text" readonly/>
                            <h2> Prescribed Medication </h2>
                            <div id="history-prescribedDrugs">
                                <div class="appoHistory-item" v-for="drug in currentDrugAppos">
                                    <div class = "resAppo-image" style="background-image: url(RES/IMG/drug.png)"></div>
                                        <div class= searchPharma-text>
                                            <ul>
                                                <li> Drug: {{drug.drugName}} </li>    
                                                <li> Quantity: {{drug.quantity}} </li>                                    
                                                <li> Taking Period: {{drug.takingPeriod}}</li>
                                            </ul>
                                        </div>
                                </div >
                            </div>
                        </div>
                    </div>
                </div>

                <div id="history-appointment">
                    <div id="history-appointment-levo">
                        <h1> Past Appointments </h1>
                        <div id="history-appointment-box">
                            <div v-for="appointment1 in goodAppos" v-on:click="viewAppo(appointment1)" :class="[appointment1.selected ? 'appo-selected' : 'appo-appeared']">
                                <div class = "resAppo-image" style="background-image: url(RES/IMG/calendar.png)"></div>
                                    <div class= searchPharma-text>
                                        <ul>
                                            <li> Pharmacy: {{appointment1.pharmacyName}} </li>    
                                            <li> Doctor: {{appointment1.doctor}} </li>                                    
                                            <li> Price: {{appointment1.price}} $ </li>
                                            <li> Date: {{appointment1.datum}} </li>
                                            
                                        </ul>
                                    </div>
                            </div >
                            <div v-for="appointment2 in badAppos" v-on:click="viewAppo(appointment2)" :class="[appointment2.selected ? 'appo-deniedSelect' : 'appo-denied']">
                                <div class = "resAppo-image" style="background-image: url(RES/IMG/calendar.png)"></div>
                                    <div class= searchPharma-text>
                                        <ul>
                                            <li> Pharmacy: {{appointment2.pharmacyName}} </li>    
                                            <li> Doctor: {{appointment2.doctor}} </li>                                    
                                            <li> Price: {{appointment2.price}} $ </li>
                                            <li> Date: {{appointment2.datum}} </li>
                                            
                                        </ul>
                                    </div>
                            </div >
                            <div v-for="appointment in questionAppos" v-on:click="viewAppo(appointment)" :class="[appointment.selected ? 'appo-questionSelect' : 'appo-question']">
                                <div class = "resAppo-image" style="background-image: url(RES/IMG/calendar.png)"></div>
                                    <div class= searchPharma-text>
                                        <ul>
                                            <li> Pharmacy: {{appointment.pharmacyName}} </li>    
                                            <li> Doctor: {{appointment.doctor}} </li>                                    
                                            <li> Price: {{appointment.price}} $ </li>
                                            <li> Date: {{appointment.datum}} </li>
                                            
                                        </ul>
                                    </div>
                            </div >
                        </div>
                    </div>
                    <div id="history-appointment-desno">
                        <h1> Appointment Information </h1>
                        <div id="history-appointment-desnoLevo">
                            <h2> Dermatologist </h2>
                            <input class="history-input" v-model="doctor" type="text" readonly/>
                            <h2> Date </h2>
                            <input class="history-input" v-model="date" type="text" readonly/>
                            <h2> Patient Appeared </h2>
                            <input class="history-input" v-model="appeared" type="text" readonly/>
                            <h2> Time Duration </h2>
                            <input class="history-input" v-model="startTime" type="text" readonly/>
                            <h2> Report </h2>
                            <input class="history-input" v-model="report" type="text" readonly/>
                        </div>
                        <div id="history-appointment-desnoDesno">
                            <h2> Pharmacy Name </h2>
                            <input class="history-input" v-model="pharmacy" type="text" readonly/>
                            <h2> Price </h2>
                            <input class="history-input" v-model="price" type="text" readonly/>
                            <h2> Prescribed Medication </h2>
                            <div id="history-prescribedDrugs">
                                <div class="appoHistory-item" v-for="drug in currentDrugAppos">
                                    <div class = "resAppo-image" style="background-image: url(RES/IMG/drug.png)"></div>
                                        <div class= searchPharma-text>
                                            <ul>
                                                <li> Drug: {{drug.drugName}} </li>    
                                                <li> Quantity: {{drug.quantity}} </li>                                    
                                                <li> Taking Period: {{drug.takingPeriod}}</li>
                                            </ul>
                                        </div>
                                </div >
                            </div>
                        </div>
                    </div>
                </div>

                <div id="history-drugOrder">
                    <div id="history-drugOrder-levo">
                        <h1> Past Medication Orders </h1>
                        <div id="history-drugOrder-box">
                            <div v-for="order in goodMedics" v-on:click="viewOrder(order)" :class="[order.selected ? 'appo-selected' : 'appo-appeared']">
                                <div class ="resAppo-image" style="background-image: url(RES/IMG/shipment.png)"></div>
                                <div class= searchPharma-text>
                                    <ul>
                                        <li> Drug Name: {{order.drugName}} </li>
                                        <li> Quantity: {{order.quantity}} </li>
                                        <li> Price: {{order.price}} $</li>
                                        <li> Date: {{order.datum}} </li>
                                    </ul>
                                </div>
                            </div >
                            <div v-for="order in badMedics" v-on:click="viewOrder(order)" :class="[order.selected ? 'appo-deniedSelect' : 'appo-denied']">
                                <div class ="resAppo-image" style="background-image: url(RES/IMG/shipment.png)"></div>
                                <div class= searchPharma-text>
                                    <ul>
                                        <li> Drug Name: {{order.drugName}} </li>
                                        <li> Quantity: {{order.quantity}} </li>
                                        <li> Price: {{order.price}} $</li>
                                        <li> Date: {{order.datum}} </li>  
                                    </ul>
                                </div>
                            </div >
                        </div>
                    </div>
                    <div id="history-drugOrder-desno">
                        <h1> Medication Information </h1>
                        <div id="history-drugOrder-desnoLevo">
                            <h2> Drug Name </h2>
                            <input class="history-input" type="text" v-model="drugName" readonly/>
                            <h2> Drug Shape </h2>
                            <input class="history-input" type="text" v-model="drugShape" readonly/>
                            <h2> Quantity </h2>
                            <input class="history-input" type="text" v-model="quantity" readonly/>
                            <h2> Drug Recieved </h2>
                            <input class="history-input" type="text" v-model="drugRecieved" readonly/>
                        </div>
                        <div id="history-drugOrder-desnoDesno">
                            <h2> Drug Type </h2>
                            <input class="history-input" type="text" v-model="drugType" readonly/>
                            <h2> Date </h2>
                            <input class="history-input" type="text" v-model="date" readonly/>
                            <h2> Price </h2>
                            <input class="history-input" type="text" v-model="price" readonly/>
                        </div>
                    </div>
                </div>
            </div>

	    </div>
`,
    methods: {
        hideDivs: function()
    	{
            document.getElementById("history-consult").style.display = 'none';
        	document.getElementById("history-appointment").style.display = 'none';
    		document.getElementById("history-drugOrder").style.display = 'none';
            this.unselectAll();
            this.doctor = "";
            this.pharmacy = "";
            this.price = "";
            this.date = "";
            this.appeared = "";
            this.report = "";
            this.startTime = "";
            this.endTime = "";
            this.drugName = "";
            this.drugShape = "";
            this.drugType = "";
            this.drugRecieved = "";
            this.currentDrugAppos = [];
        },
        consultationHistory: function()
        {
            this.hideDivs();
            document.getElementById("history-consult").style.display = 'block';
        },
        appointmentHistory: function()
        {
            this.hideDivs();
            document.getElementById("history-appointment").style.display = 'block';
        },
        drugOrders: function()
        {
            this.hideDivs();
            document.getElementById("history-drugOrder").style.display = 'block';
        },
		patientMenu: function()
        {
        	this.$router.push("/patientHome")
        },
        
        unselectAll: function()
        {
            for(let i = 0; i < this.goodAppos.length; i++)
            {
                this.goodAppos[i].selected = false;
            }
            for(let i = 0; i < this.badAppos.length; i++)
            {
                this.badAppos[i].selected = false;
            }
            for(let i = 0; i < this.questionAppos.length; i++)
            {
                this.questionAppos[i].selected = false;
            }
            for(let i = 0; i < this.goodMedics.length; i++)
            {
                this.goodMedics[i].selected = false;
            }
            for(let i = 0; i < this.badMedics.length; i++)
            {
                this.badMedics[i].selected = false;
            }
            for(let i = 0; i < this.goodConsults.length; i++)
            {
                this.goodConsults[i].selected = false;
            }
            for(let i = 0; i < this.badConsults.length; i++)
            {
                this.badConsults[i].selected = false;
            }
            for(let i = 0; i < this.qConsults.length; i++)
            {
                this.qConsults[i].selected = false;
            }
        },
        viewAppo: function(appointment)
        {
            this.unselectAll();
            this.currentDrugAppos = [];
            for(let i = 0; i < this.drugAppointments.length ; i++)
            {
                if(this.drugAppointments[i].appointmentID === appointment.id)
                {
                    this.currentDrugAppos.push(this.drugAppointments[i]);
                }
            }
            appointment.selected = true;

            this.doctor = appointment.doctor;
            this.pharmacy = appointment.pharmacyName;
            this.date = appointment.datum;
            if(appointment.appeared == true)
            {
                this.appeared = "Patient has appeared";
            }
            else if(appointment.appeared == false)
            {
                this.appeared = "Patient did not appear";
            }
            else
            {
                this.appeared = "Waiting for Doctor submission";
            }
            if(appointment.report === "")
            {
                this.report = "Report not submited yet";
            }
            else
            {
                this.report = appointment.report;
            }
            this.price = appointment.price + " $";
            this.endTime = appointment.krajVremena;
            this.startTime = appointment.pocetakVremena + " - " + this.endTime;
        },
        viewConsult: function(consult)
        {

        },
        viewOrder: function(order)
        {
            this.unselectAll();
            console.log(order);
            order.selected = true;
            this.drugName = order.drugName;
            this.drugType = order.drugType;
            this.drugShape = order.drugShape;
            this.date = order.datum;
            this.quantity = order.quantity;
            this.price = order.price + " $";
            if(order.recived)
            {
                this.drugRecieved = "Drug Successfully Recived";
            }   
            else
            {
                this.drugRecieved = "Patient didn't recive drug !";
            }
        },
        getPastAppointments: function()
        {
            axios
			.get("/appointment/getPastAppointments/"+this.email)
			.then(response => {
                this.pastAppos = response.data;
                for(let i = 0 ; i < this.pastAppos.length ; i++)
                {
                    if(this.pastAppos[i].appeared == true)
                    {
                        this.goodAppos.push(this.pastAppos[i]);
                    }
                    if(this.pastAppos[i].appeared == false)
                    {
                        this.badAppos.push(this.pastAppos[i]);
                    }
                    if(this.pastAppos[i].appeared == null)
                    {
                        this.questionAppos.push(this.pastAppos[i]);
                    }
                }
            });
        },
        getPastConsultations: function()
        {
            axios
			.get("/appointment/getPastConsultations/"+this.email)
			.then(response => {
                this.pastConsults = response.data;
                for(let i = 0 ; i < this.pastConsults.length ; i++)
                {
                    if(this.pastConsults[i].appeared == true)
                    {
                        this.goodConsults.push(this.pastConsults[i]);
                    }
                    if(this.pastConsults[i].appeared == false)
                    {
                        this.badConsults.push(this.pastConsults[i]);
                    }
                    if(this.pastConsults[i].appeared == null)
                    {
                        this.qConsults.push(this.pastConsults[i]);
                    }
                }
            });
        },
        getPastMedications: function()
        {
            axios
			.get("/patientOrder/getMyFinishedOrders/"+this.email)
			.then(response => {
                this.pastMedication = response.data;
                for(let i = 0 ; i < this.pastMedication.length ; i++)
                {
                    if(this.pastMedication[i].recived)
                    {
                        this.goodMedics.push(this.pastMedication[i]);
                    }
                    else
                    {
                        this.badMedics.push(this.pastMedication[i]);
                    }
                }
            });
        },
        getDrugAppointments: function()
        {
            axios
			.get("/drugAppointment/getMyDrugAppointments/"+this.email)
			.then(response => {
                this.drugAppointments = response.data;
            });
        },
    },
    mounted(){
        let user = JSON.parse(localStorage.getItem('user'))
        this.email = user.email;
        
        this.getPastAppointments();
        this.getPastConsultations();
        this.getPastMedications();
        this.getDrugAppointments();
    }
});