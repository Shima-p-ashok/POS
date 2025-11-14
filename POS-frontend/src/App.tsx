import { Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import ToastContainer from "react-bootstrap/esm/ToastContainer";

// Components
import Header from "./components/Header";

// Dashboard
import Dashboard from "./pages/DashBoard/Dashboard";
import Settings from "./pages/Settings/Dashboard/Settings";

// ------------------ Sales ------------------ //
import SalesList from "./pages/Sales/List";
import SalesCreate from "./pages/Sales/Create";
import SalesView from "./pages/Sales/View";
import SalesEdit from "./pages/Sales/Edit";

// // ------------------ Purchase ------------------ //
// import PurchaseList from "./pages/Purchase/List";
// import PurchaseCreate from "./pages/Purchase/Create";
// import PurchaseView from "./pages/Purchase/View";
// import PurchaseEdit from "./pages/Purchase/Edit";

// // ------------------ Inventory ------------------ //
// import InventoryList from "./pages/Inventory/List";
// import InventoryCreate from "./pages/Inventory/Create";
// import InventoryView from "./pages/Inventory/View";
// import InventoryEdit from "./pages/Inventory/Edit";

// ------------------ Customers ------------------ //
import CustomerList from "./pages/Customers/List";
import CustomerCreate from "./pages/Customers/Create";
import CustomerView from "./pages/Customers/View";
import CustomerEdit from "./pages/Customers/Edit";

// // ------------------ Quotation ------------------ //
// import QuotationList from "./pages/Quotation/List";
// import QuotationCreate from "./pages/Quotation/Create";
// import QuotationView from "./pages/Quotation/View";
// import QuotationEdit from "./pages/Quotation/Edit";

// // ------------------ Reports ------------------ //
// import ReportList from "./pages/Reports/List";
// import ReportCreate from "./pages/Reports/Create";
// import ReportView from "./pages/Reports/View";
// import ReportEdit from "./pages/Reports/Edit";

// ------------------ Settings ------------------ //
//Category
import CategoryList from "./pages/Settings/Pages/Category/List";
import CategoryCreate from "./pages/Settings/Pages/Category/Create";
import CategoryView from "./pages/Settings/Pages/Category/View";
import CategoryEdit from "./pages/Settings/Pages/Category/Edit";

// Company
import CompanyList from "./pages/Settings/Pages/Company/List";
import CompanyCreate from "./pages/Settings/Pages/Company/Create";
import CompanyView from "./pages/Settings/Pages/Company/View";
import CompanyEdit from "./pages/Settings/Pages/Company/Edit";

//Product
import ProductList from "./pages/Settings/Pages/Product/List";
import ProductCreate from "./pages/Settings/Pages/Product/Create";
import ProductEdit from "./pages/Settings/Pages/Product/Edit";
import ProductView from "./pages/Settings/Pages/Product/View";

// //Manufacturer
// import ManufacturerList from "./pages/Settings/Pages/Manufacturer/List";
// import ManufacturerCreate from "./pages/Settings/Pages/Manufacturer/Create";
// import ManufacturerView from "./pages/Settings/Pages/Manufacturer/View";
// import ManufacturerEdit from "./pages/Settings/Pages/Manufacturer/Edit";


function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />

        {/* ------------------ Sales ------------------ */}
        <Route path="/sales" element={<SalesList />} />
        <Route path="/sales-create" element={<SalesCreate />} />
        <Route path="/sales-view" element={<SalesView />} />
        <Route path="/sales-edit" element={<SalesEdit />} />

        {/* ------------------ Purchase ------------------ */}
        {/* <Route path="/purchase" element={<PurchaseList />} />
        <Route path="/purchase-create" element={<PurchaseCreate />} />
        <Route path="/purchase-view" element={<PurchaseView />} />
        <Route path="/purchase-edit" element={<PurchaseEdit />} /> */}

        {/* ------------------ Inventory ------------------ */}
        {/* <Route path="/inventory" element={<InventoryList />} />
        <Route path="/inventory-create" element={<InventoryCreate />} />
        <Route path="/inventory-view/:id" element={<InventoryView />} />
        <Route path="/inventory-edit/:id" element={<InventoryEdit />} /> */}

        {/* ------------------ Customers ------------------ */}
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers-create" element={<CustomerCreate />} />
        <Route path="/customers-view/:id" element={<CustomerView />} />
        <Route path="/customers-edit/:id" element={<CustomerEdit />} />

        {/* ------------------ Quotation ------------------ */}
        {/* <Route path="/quotation" element={<QuotationList />} />
        <Route path="/quotation-create" element={<QuotationCreate />} />
        <Route path="/quotation-view/:id" element={<QuotationView />} />
        <Route path="/quotation-edit/:id" element={<QuotationEdit />} /> */}

        {/* ------------------ Reports ------------------ */}
        {/* <Route path="/reports" element={<ReportList />} />
        <Route path="/report-create" element={<ReportCreate />} />
        <Route path="/report-view/:id" element={<ReportView />} />
        <Route path="/report-edit/:id" element={<ReportEdit />} /> */}

        {/* ------------------ Settings ------------------ */}
        {/* Category */}
        <Route path="/category" element={<CategoryList />} />
        <Route path="/category-create" element={<CategoryCreate />} />
        <Route path="/category-view/:id" element={<CategoryView />} />
        <Route path="/category-edit/:id" element={<CategoryEdit />} /> 

        {/* Company */}
        <Route path="/company" element={<CompanyList />} />
        <Route path="/company-create" element={<CompanyCreate />} />
        <Route path="/company-view/:id" element={<CompanyView />} />
        <Route path="/company-edit/:id" element={<CompanyEdit />} /> 

        {/* Product */}
        <Route path="/product" element={<ProductList />} />
        <Route path="/product-create" element={<ProductCreate />} />
        <Route path="/product-view/:id" element={<ProductView />} />
        <Route path="/product-edit/:id" element={<ProductEdit />} />

        {/* Manufacturer */}
        {/* <Route path="/manufacturer" element={<ManufacturerList />} />
        <Route path="/manufacturer-create" element={<ManufacturerCreate />} />
        <Route path="/manufacturer-view/:id" element={<ManufacturerView />} />
        <Route path="/manufacturer-edit/:id" element={<ManufacturerEdit />} /> */}
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
