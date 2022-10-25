Vue.component("Issueing", {
    data: function() {
        return {
            res: {drugs: null},
        }
    },

    template: ` 
	    
<div>	    
	<div id="iss-main-div">
    	<h2>Issue drugs</h2>
    	<table style="margin: auto;">
    		<tr>
    			<td>Enter reservation number:</td><td><input id="resCode"type="text"/></td><td><button v-on:click="findReservation()">Find reservation</button></td>
    		</tr>
    	</table>
    	
    	<table id="resd-drugs-table">
    		<thead>
    			<th>Drug name</th>
    			<th>Amount</th>
    			<th>Price per unit</th>
    		</thead>
    		<tbody>
    			<tr v-for="d in res.drugs">
    				<td>{{d.drug.name}}</td>
    				<td>{{d.amount}}</td>
    				<td>{{d.price}}</td>
    			</tr>
    		</tbody>
    	</table>
    	<table style="margin: auto;">
    		<tr>
    			<td id="ressdate"></td><td id="ressprice"></td><td style="display: none;"id="issue"><button v-on:click="issueReservation()">Issue reservation</button></td>
    		</tr>
    		<tr>
    		<td>
    		<input type="button" value="Home" v-on:click="goHome()">
    		</td>
    		</tr>
    	</table>
    	
	</div>
	<div id="issdialog" title="Notification">
	    			<p id="issp"></p>
	    		</div>
</div>	
`,
	mounted(){
    	var dialog
        dialog = $('#issdialog').dialog({
        	autoOpen: false,
            resizable: false,
            draggable: false,
            height: 200,
            width: 250,
            modal: true,
            buttons: {
              Ok : function() {
                dialog.dialog("close");
              },  
            }});
    },
    methods: {
    	goHome : async function(){
    		console.log("Going home!");
    		this.$router.push("/employeeHome");
    	},
    	
    	findReservation : async function(){
    		
    		await axios 
    		.get('/reservation/getReservation/'+$('#resCode').val()+'/'+JSON.parse(localStorage.getItem("user")).id)
    		.then(response => (this.res = response.data))
    		//console.log(this.res);
    		if(typeof this.res === 'string' || this.res instanceof String){
    			$('#issp').html(this.res);
        		$('#issdialog').dialog("open");
        		return;
    		}
    		
    		var isd = new Date(this.res.dateReserved);
    		//console.log(isd.getDate());
    		$("#ressdate").html("Reserved in:"+isd.getDate()+"/"+isd.getMonth()+" leta gospodnjeg "+isd.getFullYear());
    		$("#ressprice").html("Total price: "+this.res.totalPrice);
    		$("#issue").show();
    	},
    	issueReservation : async function(){
    		//console.log(this.res.id);
    		var odg;
    		await axios 
    		.post('/reservation/issueReservation/'+this.res.id)
    		.then(response=>(odg = response.data))
    		$('#issp').html(odg);
    		$('#issdialog').dialog("open");
    	}
    },
    
});
    	