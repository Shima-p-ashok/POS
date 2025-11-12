// import React, { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import { useNavigate, useParams } from "react-router-dom";
// import CompanyService from "../../../../services/SettingsServices/CompanyService";
// import KiduCreateAndEdit from "../../../../components/KiduCreateAndEdit";
// import type { Company } from "../../../../types/SettingsTypes/Company.types";

// const companyFields = [
//   {
//     name: "companyId",
//     label: "Company ID",
//     type: "text",
//     required: true,
//     readOnly: true, 
//   },
//   { name: "companyName", label: "Company Name", type: "text", required: true, },
//   { name: "website", label: "Website", type: "text" },
//   { name: "contactNumber", label: "Contact Number", type: "text" },
//   { name: "email", label: "Email", type: "email" },
//   { name: "taxNumber", label: "Tax Number", type: "text" },
//   { name: "addressLine1", label: "Address Line 1", type: "text" },
//   { name: "addressLine2", label: "Address Line 2", type: "text" },
//   { name: "city", label: "City", type: "text" },
//   { name: "state", label: "State", type: "text" },
//   { name: "country", label: "Country", type: "text" },
//   { name: "zipCode", label: "ZIP Code", type: "text" },
//   { name: "invoicePrefix", label: "Invoice Prefix", type: "text" },
//   { name: "companyLogo", label: "Company Logo (URL)", type: "text" },
// ];

// const CompanyEdit: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [company, setCompany] = useState<Company | null>(null);
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch company by ID
//   useEffect(() => {
//     const fetchCompany = async () => {
//       try {
//         if (!id) throw new Error("Company ID not found in URL");
//         const res = await CompanyService.getById(Number(id));
//         if (res.isSuccess) {
//           setCompany(res.value);
//         } else {
//           throw new Error(res.message || "Failed to load company data");
//         }
//       } catch (error: unknown) {
//         Swal.fire("Error", (error as Error).message, "error");
//         navigate("/company");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCompany();
//   }, [id, navigate]);

//   // ✅ Update handler
//   const handleUpdate = async (data: Partial<Company>) => {
//     try {
//       if (!id) throw new Error("Company ID missing");
//       setLoading(true);
//       const res = await CompanyService.update(Number(id), data as Company);
//       Swal.fire("Success", res.message || "Company updated successfully!", "success");
//       navigate("/company");
//     } catch (error: unknown) {
//       Swal.fire("Error", (error as Error).message, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <p className="text-center mt-4">Loading...</p>;
//   if (!company) return <p className="text-center mt-4">Company not found.</p>;

//   // ✅ Provide default value (non-editable) for ID field
//   const initialData = {
//     ...company,
//     companyId: company.companyId.toString(), // ensure it’s shown but not editable
//   };

//   return (
//     <div style={{ minHeight: "100vh", padding: "20px", backgroundColor: "#f3f3f3" }}>
//       <KiduCreateAndEdit
//         key={company.companyId}
//         title="Edit Company"
//         fields={companyFields}
//         initialData={initialData as Record<string, string | number | boolean>}
//         onSubmit={handleUpdate}
//         loading={loading}
//       />
//     </div>
//   );
// };

// export default CompanyEdit;
