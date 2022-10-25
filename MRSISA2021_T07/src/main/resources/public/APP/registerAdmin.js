Vue.component("registerAdmin", {
    data: function() {
        return {
            admin: {
				role: "ADMIN",
            }
        }
    },

    template: ` 
<div>  
	<div id="form">
	   <form>
	    		<table id="tabela>
	    			<tr>
	    				<td>ID: </td>
	    				<td><input type="text" v-model="admin.id"></td>
	    			</tr>
	    			<tr>
	    				<td>Name: </td>
	    				<td><input type="text" name="ime" v-model="admin.name"></td>
	    			</tr>
	    			<tr>
	    				<td>Surname: </td>
	    				<td><input type="text" v-model="admin.surname"></td>
	    			</tr>
	    			<tr>
	    				<td>Email: </td>
	    				<td><input type="text" v-model="admin.email"></td>
	    			</tr>
	    			<tr>
	    				<td>Password: </td>
	    				<td><input type="text" v-model="admin.password"></td>
	    			</tr>
	    			<tr>
	    				<td>Address: </td>
	    				<td><input type="text" v-model="admin.address"></td>
	    			</tr>
	    			<tr>
	    				<td>City: </td>
	    				<td><input type="text" v-model="admin.city"></td>
	    			</tr>
	    			<tr>
	    				<td>Country: </td>
	    				<td><input type="text" v-model="admin.country"></td>
	    			</tr>
	    			<tr>
	    				<td>Number: </td>
	    				<td><input type="text" v-model="admin.number"></td>
	    			</tr>
	    			<tr>
	    				<td>AdminType: </td>
	    				<td><input type="text" v-model="admin.adminType"></td>
	    			</tr>
					<div>
                		<button type = "submit" class="btn btn-sm btn-outline-primary" v-on:click="post">Register</button>
            		</div>
					<div>
                		<button type = "submit" class="btn btn-sm btn-outline-primary" v-on:click="back">Back</button>
            		</div>
	    		</table>
	    	</form>
    </div>
</div>		  
`,
    methods: {
        post: function() {
			
            axios
                .post("/admin/registerAdmin", this.admin)
				.then(response => {
					console.log(this.response)
					this.bool = response.data
					if(!this.bool){
						alert("Cannot add new user. Check details and try again.")
					}else{
						alert("Successfull adding.")
					}
					window.location.reload()
				})
        },
		back : function(){
			this.$router.push("/systemAdminHome")
			
		},
    }

});