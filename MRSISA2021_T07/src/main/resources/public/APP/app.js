const Home = { template: '<Home></Home>' }
const Profile = { template: '<Profile></Profile>' }
const RegisterAdmin = { template: '<registerAdmin></registerAdmin>' }
const PatientHistory = { template: '<patientHistory></patientHistory>' }
const RegisterPharmacy = { template: '<RegisterPharmacy></RegisterPharmacy>' }
const RegisterPharmacyAdmin = { template: '<RegisterPharmacyAdmin></RegisterPharmacyAdmin>' }
const Registration = { template: '<Registration></Registration>' }
const EmployeeHome = { template: '<EmployeeHome></EmployeeHome>' }
const RegisterDerma = { template: '<RegisterDermatologist></RegisterDermatologist>' }
const RegisterSupplier = { template: '<RegisterSupplier></RegisterSupplier>' }
const WorkingCalendar = { template: '<WorkingCalendar></WorkingCalendar>' }
const AddDrug = { template: '<AddDrug></AddDrug>' }
const PharmaAdminHome = { template: '<PharmaAdminHome></PharmaAdminHome>' }
const SystemAdminHome = { template: '<SystemAdminHome></SystemAdminHome>' }
const ChangePharmacyProfile = { template: '<ChangePharmacyProfile></ChangePharmacyProfile>' }
const Appointments = { template: '<Appointments></Appointments>' }
const NewAppointment = { template: '<NewAppointment></NewAppointment>' }
const EmailVerification = { template: '<EmailVerification></EmailVerification>' }
const PatientHome = { template: '<PatientHome></PatientHome>' }
const PharmacySearch = { template: '<PharmacySearch></PharmacySearch>' }
const EmployeeGrades = { template: '<EmployeeGrades></EmployeeGrades>' }
const NewAppointmentDerma = { template: '<NewAppointmentDerma></NewAppointmentDerma>' }
const EditDrugsPharma = { template: '<EditDrugsPharma></EditDrugsPharma>' }
const ReservePharmacist = { template: '<ReservePharmacist></ReservePharmacist>' }
const Logout = { template: '<Logout></Logout>' }
const RegisterPharmacist = { template: '<RegisterPharmacist></RegisterPharmacist>' }
const CancelConsultation = { template: '<CancelConsultation></CancelConsultation>' }
const RateEmployee = { template: '<RateEmployee></RateEmployee>' }
const SupplierHome = { template: '<SupplierHome></SupplierHome>' }
const SupplyProfile = { template: '<SupplyProfile></SupplyProfile>' }
const PharmacyOffers = { template: '<PharmacyOffers></PharmacyOffers>' }
const SupplierOffers = { template: '<SupplierOffers></SupplierOffers>' }
const SupplierAcceptingOffers = { template: '<SupplierAcceptingOffers></SupplierAcceptingOffers>' }
const PriceList = { template: '<PriceList></PriceList>' }
const Appointment = { template: '<Appointment></Appointment>' }
const ViewProfile = { template: '<ViewProfile></ViewProfile>' }
const OrderDrugs = { template: '<OrderDrugs></OrderDrugs>' }
const PatientMedication = { template: '<PatientMedication></PatientMedication>' }
const SupplierOffer = { template: '<SupplierOffer></SupplierOffer>' }
const Subscribe = { template: '<Subscribe></Subscribe>' }
const PatientSubscriptions = { template: '<PatientSubscriptions></PatientSubscriptions>' }
const WriteComplaint = { template: '<WriteComplaint></WriteComplaint>' }
const OrderDrugsHome = { template: '<OrderDrugsHome></OrderDrugsHome>' }
const MadeOrders = { template: '<MadeOrders></MadeOrders>' }
const Issueing = { template: '<Issueing></Issueing>' }
const AcceptOrder = { template: '<AcceptOrder></AcceptOrder>' }
const AbsenceApprove = { template: '<AbsenceApprove></AbsenceApprove>' }
const Promotion = { template: '<Promotion></Promotion>' }
const EditDrugsHome = { template: '<EditDrugsHome></EditDrugsHome>' }
const AddRank = { template: '<AddRank></AddRank>' }
const LineChart = { template: '<LineChart></LineChart>' }
const Reports = { template: '<Reports></Reports>' }
const FirstLogin = { template: '<FirstLogin></FirstLogin>' }
const RegisterDermaPharma = { template: '<RegisterDermaPharma></RegisterDermaPharma>' }
const Inquiry = { template: '<Inquiry></Inquiry>' }
const QR = { template: '<QR></QR>' }
const AdminReply = { template: '<AdminReply></AdminReply>' }

const router = new VueRouter({
    mode: 'hash',
    routes: [
        { path: '/', component: Home },
        { path: '/employeeHome', component: EmployeeHome },
        { path: '/patientHome', component: PatientHome },
        { path: '/profile', component: Profile },
        { path: '/registerAdmin', component: RegisterAdmin },
        { path: '/registerPharmacy', component: RegisterPharmacy },
        { path: '/registerPharmacyAdmin', component: RegisterPharmacyAdmin },
        { path: '/register', component: Registration },
        { path: '/registerDermatologist', component: RegisterDerma },
        { path: '/registerSupplier', component: RegisterSupplier },
        { path: '/workingCalendar', component: WorkingCalendar },
        { path: '/addDrug', component: AddDrug },
        { path: '/pharmaAdminHome', component: PharmaAdminHome },
        { path: '/systemAdminHome', component: SystemAdminHome },
        { path: '/changePharmacy', component: ChangePharmacyProfile },
        { path: '/appointment', component: Appointment },
        { path: '/viewProfile', component: ViewProfile },
        { path: '/newAppointment', component: NewAppointment },
        { path: '/reservePharmacist', component: ReservePharmacist },
        { path: '/emailVerification', component: EmailVerification },
        { path: '/pharmacySearch', component: PharmacySearch },
        { path: '/employeeGrades', component: EmployeeGrades },
        { path: '/newAppointmentDerma', component: NewAppointmentDerma },
        { path: '/editDrugsPharma', component: EditDrugsPharma },
        { path: '/logout', component: Logout },
        { path: '/registerPharmacist', component: RegisterPharmacist },
        { path: '/cancelConsultation', component: CancelConsultation },
        { path: '/rateEmployee', component: RateEmployee },
        { path: '/supplierHome', component: SupplierHome },
        { path: '/supplierProfile', component: SupplyProfile },
        { path: '/pharmacyOffers', component: PharmacyOffers },
        { path: '/supplierOffers', component: SupplierOffers },
        { path: '/supplierAccept', component: SupplierAcceptingOffers },
        { path: '/pricelist', component: PriceList },
        { path: '/appointments', component: Appointments },
        { path: '/orderDrugs', component: OrderDrugs },
        { path: '/patientMedication', component: PatientMedication },
        { path: '/supplierOffer', component: SupplierOffer },
        { path: '/subscribe', component: Subscribe },
        { path: '/patientSubscriptions', component: PatientSubscriptions },
        { path: '/writeComplaint', component: WriteComplaint },
        { path: '/orderDrugsHome', component: OrderDrugsHome },
        { path: '/madeOrders', component: MadeOrders },
        { path: '/issueing', component: Issueing },
        { path: '/acceptOrder', component: AcceptOrder },
        { path: '/absenceApprove', component: AbsenceApprove },
        { path: '/promotion', component: Promotion },
        { path: '/editDrugsHome', component: EditDrugsHome },
        { path: '/addRank', component: AddRank },
        { path: '/patientHistory', component: PatientHistory },
        { path: '/lineChart', component: LineChart },
        { path: '/reports', component: Reports },
        { path: '/firstLogin', component: FirstLogin },
        { path: '/registrationDermaPharma', component: RegisterDermaPharma },
        { path: '/inquiry', component: Inquiry },
        { path: '/qr', component: QR },
        { path: '/adminReply', component: AdminReply },


    ]

});

var app = new Vue({
    router,
    el: '#main-div',
    components: {
        vuejsDatepicker
    },
})