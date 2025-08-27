import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import DashboardHome from "../page/DashboardHome/DashboardHome";
import ForgetPassword from "../page/Auth/ForgetPassword/ForgetPassword";
import SignIn from "../page/Auth/SignIn/SignIn";
import Otp from "../page/Auth/Otp/Otp";
import NewPassword from "../page/Auth/NewPassword/NewPassword";
import PersonalInformationPage from "../page/PersonalInformation/PersonalInformationPage";
import SettingsPage from "../page/Settings/SettingsPage";
import PrivacyPolicyPage from "../page/PrivacyPolicy/PrivacyPolicyPage";
import TermsconditionPage from "../page/TermsCondition/TermsconditionPage";
import AboutUsPage from "../page/AboutUs/AboutUsPage";
import Notification from "../component/Main/Notification/Notification";
import EditPersonalInformationPage from "../page/EditPersonalInformationPage/EditPersonalInformationPage";
import EditPrivacyPolicy from "../page/EditPrivacyPolicy/EditPrivacyPolicy";
import EditTermsConditions from "../page/EditTermsConditions/EditTermsConditions";
import EditAboutUs from "../page/EditAboutUs/EditAboutUs";
import UserManagementPage from "../page/UserManagement/UserManagementPage";
import AdminRoutes from "./AdminRoutes";
import UserDetailsPage from "../page/UserDetailsPage/UserDetailsPage";
import EarningsPage from "../page/EarningsPage/EarningsPage";
import ReportsPage from "../page/ReportsPage/ReportsPage";
import UserAgreement from "../page/UserAgreement/UserAgreement";
import EditUserAgreement from "../page/EditUserAgreement/EditUserAgreement";
import MessagePage from "../page/MessagePage/MessagePage";
import ProductRequestsPage from "../page/ProductRequestsPage/ProductRequestsPage";
import ProductRequestsDetailsPage from "../page/ProductRequestsDetailsPage/ProductRequestsDetailsPage";
import TeamsListDetailsPage from "../page/TeamsListDetailsPage/TeamsListDetailsPage";
import TeamslistPage from "../page/TeamslistPage/TeamslistPage";
import SubscriptionPage from "../page/SubscriptionPage/SubscriptionPage";
import PaymentRequestPage from "../page/PaymentRequestPage/PaymentRequestPage";
import AddSubscriptionPage from "../page/AddSubscriptionPage/AddSubscriptionPage";
import EidtSubscriptionPage from "../page/EidtSubscriptionPage/EidtSubscriptionPage";
import ReportsDetailsPage from "../page/ReportsDetailsPage/ReportsDetailsPage.JSX";
import TeamsLayout from "../layout/TeamsLayout";
import TeamsHome from "../component/Teams/TeamsHome/TeamsHome";
import RestorationTask from "../component/Teams/Taks/RestorationTask";
import RestorationTaskDetails from "../component/Teams/Taks/RestorationTaskDetails";
import TeamsEarnings from "../component/Teams/TeamsEarnings/TeamsEarnings";
import TeamsSettings from "../component/Teams/TeamsSettings/TeamsSettings";
import TeamsProfile from "../component/Teams/TeamsProfile/TeamsProfile";
import TeamsMessage from "../component/Teams/teamsMessage/teamsMessage";
import AddTeamMember from "../component/Teams/AddTeamMember/AddTeamMember";
import TeamsRoutes from "./TeamsRoutes";
import ManagerLayout from "../layout/ManagerLayout";
import ManagerRoutes from "./ManagerRoutes";
import ManagerDashboard from "../component/Manager/ManagerDashboard/ManagerDashboard";
import RepairRequest from "../component/Manager/RepairRequest/RepairRequest";
import Member from "../component/Manager/Member/Member";
import ManagerMessage from "../component/Manager/ManagerMessage/ManagerMessage";
import ManagerSettings from "../component/Manager/ManagerSettings/ManagerSettings";
import RepairRequestsDetails from "../component/Manager/RepairRequestsDetails/RepairRequestsDetails";
import ContractorList from "../component/Manager/Contractor/ContractorList";
import ManagerPage from "../page/ManagerPage/ManagerPage";
import ServicePage from "../page/ServicePage/ServicePage";
import ManagerProfile from "../component/Manager/ManagerProfile/ManagerProfile";
import ManagerProfileEdit from "../component/Manager/ManagerProfileEdit/ManagerProfileEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AdminRoutes>
         <MainLayout />
      </AdminRoutes>
    ),
    errorElement: <h1>Error</h1>,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "/users",
        element: <UserManagementPage />,
      },
      {
        path: "/users/:id",
        element: <UserDetailsPage />,
      },
      {
        path: "/Managerlist",
        element: <ManagerPage />,
      },
      {
        path: "Service",
        element: <ServicePage />,
      },
      {
        path: "personal-info",
        element: <PersonalInformationPage />,
      },
      {
        path: "edit-personal-info",
        element: <EditPersonalInformationPage />,
      },
      {
        path: "RepairRequest",
        element: <ProductRequestsPage />,
      },
      {
        path: "RepairRequest/:id",
        element: <ProductRequestsDetailsPage />,
      },
      {
        path: "Teamslist",
        element: <TeamslistPage />,
      },
      {
        path: "PaymentRequest",
        element: <PaymentRequestPage />
      },
      {
        path: "Subscription",
        element: <SubscriptionPage />,
      },
      {
        path: "AddSubscription",
        element: <AddSubscriptionPage />
      },
      {
          path: "Subscription/:id",
          element: <EidtSubscriptionPage/>
      },
      {
        path: "contractor/:id",
        element: <TeamsListDetailsPage />,
      },
      {
        path: "Message",
        element: <MessagePage />,
      },
      {
        path: "Earnings",
        element: <EarningsPage />,
      },
      {
        path: "Reports",
        element: <ReportsPage />,
      },
      {
        path:"Reports/:id",
        element:<ReportsDetailsPage/>
      },
      {
        path: "/notification",
        element: <Notification />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "/settings/UserAgreement",
        element: <UserAgreement />,
      },
      {
        path: "/settings/UserAgreement/:id",
        element: <EditUserAgreement />,
      },
      {
        path: "settings/privacy-policy",
        element: <PrivacyPolicyPage />,
      },
      {
        path: "/settings/edit-privacy-policy/:id",
        element: <EditPrivacyPolicy />,
      },
      {
        path: "settings/terms-conditions",
        element: <TermsconditionPage />,
      },
      {
        path: "/settings/edit-terms-conditions/:id",
        element: <EditTermsConditions />,
      },
      {
        path: "settings/about-us",
        element: <AboutUsPage />,
      },
      {
        path: "/settings/edit-about-us/:id",
        element: <EditAboutUs />,
      },
    ],
  },
  {
    path:"/",
    element:(
      <TeamsRoutes>
        <TeamsLayout />
       </TeamsRoutes>
    ),
   errorElement: <h1>Error</h1>,
   children:[
    {
        path: "Teams",
        element: <TeamsHome />,
    },
    {
      path: "Task",
      element: <RestorationTask />
    },
    {
      path:"task/:id",
      element: <RestorationTaskDetails />
    },
    {
     path:"TeamsEarnings",
     element: <TeamsEarnings />
    },
    {
      path: "TeamsSettings",
      element: <TeamsSettings />
    },
    {
      path:"TeamsProfile",
      element: <TeamsProfile />
    },
    {
      path:"teamsMessage",
      element: <TeamsMessage />
    },
    {
      path: "settings/AddTeamMember",
      element: <AddTeamMember />
    }
   ]
  },
  {
    path: "/",
    element:(
      <ManagerRoutes>
      <ManagerLayout />
      </ManagerRoutes>
    ),
    errorElement: <h1>Error</h1>,
    children: [
      {
        path: "Manager",
        element: <ManagerDashboard />,
      },
      {
        path: "ManagerRepairRequest",
        element: <RepairRequest />,
      },
      {
        path: "ManagerProductRequests/:id",
        element: <RepairRequestsDetails />,
      },
      {
        path: "Member",
        element: <Member />,
      },
      {
        path: "Contractor",
        element: <ContractorList />,
      },
      {
        path: "ManagerMessage",
        element: <ManagerMessage />,
      },
      {
        path: "ManagerSettings",
        element: <ManagerSettings />,
      },
      {
        path: "ManagerProfile",
        element: <ManagerProfile />
      },
      {
        path: "ManagerProfileEdit",
        element: <ManagerProfileEdit />
      }
    ],
  },
  {
    path: "/auth",
    errorElement: <h1>Auth Error</h1>,
    children: [
      {
        index: true,
        element: <SignIn />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "otp/:email",
        element: <Otp />,
      },
      {
        path: "new-password/:email",
        element: <NewPassword />,
      },
    ],
  },
]);

export default router;
