Vue.component("Appointment", {
    data: function() {
        return {
            drugs: null,
            prescs: [],
        }
    },
    template: ` 
		<div>
			   <div id="app-main-div">
			    <div id="app-drugs-div">
			    	<h2>Drugs</h2>
			    	<table id="app-drugs-table">
			    		
			    	</table>
			    </div>
			    <h2>Diagnosis</h2>
			    <textarea id="diag" rows="7" style="height:150px; width:30%;"/>
			    <h2>Prescribed drugs</h2>
			    <div id="report-div">
			    	<table id="app-presc-drugs">
			    	</table>
			    	<div id="request-div">
	    				<button v-on:click="submitReport()" id="submit-btn">Submit</button>
	    				<br>
	    				<textarea id="sub-report" rows="7" cols="60"></textarea>
	    			</div>
			    </div>
			    <div id="add-drugqt-dialog" title="Prescribe drug">
	    			<p>Chose quantity: <input id="qt"  type="number" min="1" step="1" value="1" />
	    			<br>Chose taking period:<input id="td" type="number" min="1" step="1" value="1" />
	    			</p>
	    			
	    		</div>
	    		
			    
			   </div> 	
		</div>
		`,
		
	methods: {
        submitReport: async function() {
            var ans;
            var diag = $('#diag').val();
            var prescs = $('#app-presc-drugs').DataTable().data().toArray();
            console.log(JSON.stringify(prescs));
            await axios
                .post("/appointment/submitReport/" + JSON.parse(localStorage.getItem("appo")).id + "/" + diag, prescs)
                .then(response => (ans = response.data))
            if (ans == "") {
                this.$router.push('/newAppointment');
            }
            $('#sub-report').val(ans);
        },

        loadDrugs: async function() {

            await axios
                .get("/drug/getAllDrugs/" + JSON.parse(localStorage.getItem("appo")).mail)
                .then(response => (this.drugs = response.data))
            //await localStorage.setItem("drugs", JSON.stringify(this.drugs));
            //console.log(this.drugs);
            //_callback();
        },
        
        setup : async function (){
        	var lekovi;
            var prescs = [];
            var prescsTable;
            var code;
            var name;
            var codes = [];
            await this.loadDrugs(lekovi);
            //console.log("posle");
            var qtdia;
            //lekovi = JSON.parse(localStorage.getItem("drugs"));
            lekovi = this.drugs;
            qtdia = $('#add-drugqt-dialog').dialog({
                autoOpen: false,
                resizable: false,
                draggable: false,
                height: 300,
                width: 300,
                modal: true,
                buttons: {
                    Add: function() {
                        qtdia.dialog("close");
                        var newRow = Object();
                        //if(codes.includes(code)){
                        //  var pod = prescsTable.rows().data();}

                        newRow.name = name;
                        newRow.drugCode = code;
                        newRow.quantity = $('#qt').val();
                        newRow.takingPeriod = $('#td').val();
                        //console.log(newRow);
                        prescsTable.row.add(newRow).draw();
                    },
                    Cancel: function() {
                        qtdia.dialog("close");

                    },
                }

            });
            console.log(lekovi);
            var drugtable = $("#app-drugs-table").DataTable({
                data: lekovi,
                "pageLength": 10,
                "lengthChange": false,
                columns: [
                    { data: "drugCode", title: "Code" },
                    { data: "name", title: "Name" },
                    { data: "instruction", title: "Instruction" },
                    { data: "types", title: "Type" },
                    { data: "shape", title: "Shape" },
                    { data: "ingredients", title: "Contains" },
                    { data: "contradiction", title: "Contradiction" },
                    { data: "takingDose", title: "Taking Dose" },
                    { data: null, },
                ],
                "columnDefs": [{
                    "targets": -1,
                    "data": null,
                    "orderable": false,
                    "defaultContent": "<button class='addbtn'>Add</button>"
                }],
                createdRow: function(row, data, dataIndex) {
                    $(row).attr('data-id', data.id);
                }
            });
            $('#app-drugs-table').on('click', 'button', function() {
                var row = drugtable.row($(this).parents('tr'));
                var data = row.data();
                code = data.drugCode;
                name = data.name;
                //console.log(data);
                ids = data.id;
                qtdia.dialog("open");

            });
            prescsTable = $('#app-presc-drugs').DataTable({
                data: prescs,
                "pageLength": 5,
                "lengthChange": false,
                columns: [
                    { data: "drugCode", title: "Code" },
                    { data: "name", title: "Name" },
                    { data: "quantity", title: "Quantity" },
                    { data: "takingPeriod", title: "Taking Period" },
                    { data: null, titple: "" },
                ],
                "columnDefs": [{
                    "targets": -1,
                    "data": null,
                    "orderable": false,
                    "defaultContent": "<button class='clrbtn'>Remove</button>"
                }],
            });
            $('#app-presc-drugs').on('click', 'button', function() {
                prescsTable
                    .row($(this).parents('tr'))
                    .remove()
                    .draw();


            });
        }
    },	
    mounted() {
    	this.setup();
        

    },
    
})