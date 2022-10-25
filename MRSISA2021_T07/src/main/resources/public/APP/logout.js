Vue.component("Logout",{
	data: function(){
		return{
		}
	},
	
    template:`
        
        <p>Logging out...</p>
       
	`
		,
		methods : {
			
        },
        created(){
           
            localStorage.removeItem('user')
            this.$router.push("/")
            window.location.reload()
        }
});