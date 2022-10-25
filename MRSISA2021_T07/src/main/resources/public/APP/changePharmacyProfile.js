Vue.component("ChangePharmacyProfile", {
    data: function() {
        return {
            pharmacy: {

            },
            user: {

            },
            checkPharmaInfo: true,
            checkPersonalInfo: false,
            checkReports: false,
            checkChange: false,
        }
    },

    template: ` 
<div>
<link rel="stylesheet" href="style.css" />
    <div class="page-pharmainfo">
        <nav class="page__menu-pharmainfo menu">
        <ul class="menu__list-pharmainfo r-list">
            <li class="menu__group-pharmainfo"><a v-on:click="checkPharmaInformation()" class="menu__link-pharmainfo r-link text-underlined">Pharmacy info</a></li>
            <li class="menu__group-pharmainfo"><a v-on:click="checkPersonalInformation()" class="menu__link-pharmainfo r-link text-underlined">Personal info</a></li>
            <li class="menu__group-pharmainfo"><a v-on:click="checkReportsMenu()" class="menu__link-pharmainfo r-link text-underlined">Reports</a></li>
            <li class="menu__group-pharmainfo"><a href="#/pharmaAdminHome" class="menu__link-pharmainfo r-link text-underlined">Home</a></li>
        </ul>
        </nav>
    </div>
    <div class="pharma-wrapper" v-show="checkPharmaInfo">
    <div class="pharma-info">
        <table id="table-pharma-info">
        <tr>
            <td>Name: </td>
            <td><input type="text" v-model="pharmacy.name"></td>
            <td>Description:</td>
            
        </tr>
        <tr>
            <td>Address: </td>
            <td><input type="text" v-model="pharmacy.address"></td>
            <td><input type="textarea" v-model="pharmacy.description"></td>
            <td rowspan="2"><button id="edit-pharma-button" v-on:click="edit()">Edit pharmacy</button></td>
        </tr>
        </table>
    </div>
    <div ref="map-root" id="map-root" class="map-root">
    </div>
    
</div>
    <div class="pharma-wrapper-perinfo" v-show="checkPersonalInfo">
        <h1 id="h1-profile-pharma">Change profile</h1>
            <table id="profile-table-pharma">
                <tr>
                    <td>Name: </td>
                    <td><input type="text" name="ime" v-model="user.name"></td>
                </tr>
                <tr>
                    <td>Surname: </td>
                    <td><input type="text" v-model="user.surname"></td>
                </tr>
                <tr>
                    <td>Email: </td>
                    <td><input type="text" v-model="user.email" readonly="readonly"></td>
                </tr>
                <tr>
                    <td>Adress: </td>
                    <td><input type="text" v-model="user.address"></td>
                </tr>
                <tr>
                    <td>City: </td>
                    <td><input type="text" v-model="user.city"></td>
                </tr>
                <tr>
                    <td>Country: </td>
                    <td><input type="text" v-model="user.country"></td>
                </tr>
                <tr>
                    <td><button v-on:click="goBack()">Home</button></td>
                    <td><button v-on:click="editAdmin()">Edit</button></td>
                </tr>
            </table>
            <h2 id="change-password">Change password</h2>
                <table id="password-table-pharma">
                    <tr><td>Enter password:</td><td><input id="oldpswd-pharma" type="password"/></td></tr>
                    <tr><td>Enter new password:</td><td><input id="newpswd-pharma" type="password"/></td></tr>
                    <tr><td>Repeat new password:</td><td><input id="reppswd-pharma" type="password"/></td></tr>
                    <tr><button v-on:click="changePasswordPharma()">Change password</button></tr>
                </table>
            <div id="profdialog-pharma" title="Notification">
                <p id="profp-pharma"></p>
            </div>
            <div id="profdialog1-pharma" title="Notification">
                <p id="profp1-pharma"></p>
            </div>
            
    </div>    
  
   
</div>		  
`,
    methods: {
        goBack: function() {
            this.$router.push("/pharmaAdminHome")
        },
        edit: function() {
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
                            .put("pharma/updatePharmacy", this.pharmacy)
                        swal("Succesfully changed infomration!", {
                            icon: "success",
                        });

                    } else {

                        swal("Information did not change!");
                    }
                });


        },
        checkPharmaInformation: function() {
            //this.initMap();
            this.checkPharmaInfo = true
            this.checkPersonalInfo = false
            this.checkReports = false
        },
        checkPersonalInformation: function() {
            this.checkPharmaInfo = false
            this.checkPersonalInfo = true
            this.checkReports = false
        },
        checkReportsMenu: function() {
            // this.checkPharmaInfo = false
            // this.checkPersonalInfo = false
            // this.checkReports = true
            this.$router.push('/reports')
        },
        changePasswordPharma: function() {
            var old = $('#oldpswd-pharma').val();
            var neu = $('#newpswd-pharma').val();
            var rep = $('#reppswd-pharma').val();
            if (neu == '' || rep == '') {
                $('#profp-pharma').html('Empty password field!');
                $('#profdialog-pharma').dialog("open");
                return;
            }
            if (old != this.user.password) {
                $('#profp-pharma').html('Wrong password!');
                $('#profdialog-pharma').dialog("open");
                //alert('Wrong password!');
                return;
            }
            if (neu != rep) {
                $('#profp-pharma').html('Passwords do not match!');
                $('#profdialog-pharma').dialog("open");
                //alert('Passwords do not match!');
                return;
            }

            // $('#profp1-pharma').html('Are you sure? Password will be changed on next login!');
            // $('#profdialog1-pharma').dialog("open");
            swal({
                    title: "Are you sure?",
                    text: "Password will be changed on next login!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        this.checkChange = true
                        this.change(neu)

                    } else {
                        this.checkChange = false
                        swal("Password did not change!");
                    }
                });

        },
        change: function(neu) {
            if (this.checkChange === true) {
                axios
                    .put("/login/changePassword/" + this.user.id + "/" + neu)
                    .then()
                $('#profp').html('Password changed successfully');
                $('#profdialog').dialog("open");
                document.getElementById('oldpswd-pharma').value = ''
                document.getElementById('newpswd-pharma').value = ''
                document.getElementById('reppswd-pharma').value = ''
                swal("Succes!", "Successfully changed!", "success");
            }
        },
        editAdmin: function() {
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
                            .put("/admin/updateAdmin", this.user)
                            .then()
                        swal("Succesfully changed infomration!", {
                            icon: "success",
                        });

                    } else {

                        swal("Information did not change!");
                    }
                });


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
        toastr.options = {
                "closeButton": true,
                "debug": false,

                "progressBar": false,
                "positionClass": "toast-bottom-center",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "200",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            },
            this.user = JSON.parse(localStorage.getItem('user'))
        if (this.user == null) {
            console.log("Error")
        }
        axios
            .get("/admin/getpharmacy/" + this.user.id)
            .then(response => {
                this.pharmacy = response.data
            })

        this.user = JSON.parse(localStorage.getItem('user'));
        var dialog
        dialog = $('#profdialog-pharma').dialog({
            autoOpen: false,
            resizable: false,
            draggable: false,
            height: 200,
            width: 250,
            modal: true,
            buttons: {
                Ok: function() {
                    dialog.dialog("close");
                },
            }
        });
        var lonlat = [19.830550, 45.262630]
        var myMap = new ol.Map({
            target: this.$refs['map-root'],
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                }),
            ],

            view: new ol.View({
                zoom: 16,
                center: ol.proj.fromLonLat(lonlat),
                constrainResolution: true,
                image: new ol.style.Icon({

                    src: "RES/IMG/place.png",
                    // anchor: [0.5, 0.5],
                    // size: [52, 52],
                    // offset: [52, 0],
                    // opacity: 0.5,
                    // scale: 1.0,
                }),
            }),
            style: new ol.style.Style({
                image: new ol.style.Icon({
                    src: "RES/IMG/place.png",
                    //anchor: [0.5, 0.5],
                    //imgSize: [10, 10],
                    //offset: [52, 0],
                    //opacity: 0.5,
                    //scale: 1.0,
                })
            })


        })

    },
});