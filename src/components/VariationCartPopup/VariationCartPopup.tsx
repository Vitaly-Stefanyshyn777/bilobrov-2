// // потрібно
// import React, { useEffect, useState } from "react";
// import s from "./VariationCartPopup.module.css";
// import { useProductVariationsQuery } from "@/queries/useAllProductsQuery";
// import Select, { StylesConfig } from "react-select";
// import ReactDOM from "react-dom";
// import { ProductInfo } from "../../types/productTypes";
// import Image from "next/image";

// import { Loader } from "../Loader/Loader";
// import { motion } from "framer-motion";
// import { useTranslation } from "react-i18next";

// interface VariationsPopupProps {
//   onSelect: (variationId: number) => void;
//   onClose: () => void;
//   productId: number;
//   product: ProductInfo;
// }

// type OptionType = {
//   value: string;
//   label: string | React.ReactElement;
//   image?: string;
//   isDisabled?: boolean;
// };

// export const VariationsPopup: React.FC<VariationsPopupProps> = ({
//   onSelect,
//   onClose,
//   productId,
// }) => {
//   const { data: productVariations = [], isLoading } =
//     useProductVariationsQuery(productId);
//   const { t } = useTranslation();

//   const uniqueAttributes = [
//     ...new Map(
//       productVariations.flatMap((v) => {
//         // Беремо зображення з варіації для всіх атрибутів цієї варіації
//         const image = v.image?.src || ""; // або за замовчуванням порожній рядок
//         return v.attributes.map((a) => [
//           a.slug,
//           { slug: a.slug, name: a.name, image: image }, // Прив'язуємо зображення до атрибута варіації
//         ]);
//       })
//     ).values(),
//   ];

//   uniqueAttributes.sort((a) => (a.slug === "pa_color" ? -1 : 1));

//   const [selectedVariation, setSelectedVariation] = useState<number | null>(
//     null
//   );
//   const [selectedAttributes, setSelectedAttributes] = useState<{
//     [key: string]: string | null;
//   }>({});

//   useEffect(() => {
//     if (productVariations.length > 0) {
//       const firstVariation = productVariations[0];
//       const initialAttributes: { [key: string]: string } = {};

//       firstVariation.attributes.forEach(
//         (attr: { slug: string; option: string }) => {
//           initialAttributes[attr.slug] = attr.option;
//         }
//       );

//       setSelectedAttributes(initialAttributes);
//       setSelectedVariation(firstVariation.id);
//     }
//   }, [productVariations]);

//   useEffect(() => {
//     if (Object.keys(selectedAttributes).length > 0) {
//       const matchedVariation = productVariations.find(
//         (v: { id: number; attributes: { slug: string; option: string }[] }) =>
//           Object.entries(selectedAttributes).every(([key, value]) =>
//             v.attributes.some(
//               (attr: { slug: string; option: string }) =>
//                 attr.slug === key && attr.option === value
//             )
//           )
//       );

//       if (matchedVariation && matchedVariation.id !== selectedVariation) {
//         setSelectedVariation(matchedVariation.id);
//         // do nothing for now or optionally update selected state
//       }
//     }
//   }, [selectedAttributes, productVariations, selectedVariation]);

//   const handleConfirm = () => {
//     if (selectedVariation !== null) {
//       onSelect(selectedVariation);
//     }
//   };

//   const customStyles: StylesConfig<OptionType, false> = {
//     control: (provided, state) => ({
//       ...provided,
//       backgroundColor: "white",
//       borderColor: state.isFocused ? "black" : "black",
//       borderBottomWidth: "2px",
//       borderRadius: "0",
//       borderTop: "none",
//       borderRight: "none",
//       borderLeft: "none",
//       padding: "0",
//       boxShadow: state.isFocused
//         ? "0px 5px 12px 0px rgba(26, 26, 26, 0.1)"
//         : "none",
//       "&:hover": {
//         borderColor: "black",
//       },
//       "&:active": {
//         backgroundColor: "white", // Прибираємо синій фон при натисканні
//       },
//     }),
//     option: (provided, state) => ({
//       ...provided,
//       backgroundColor: state.isSelected ? "white" : "white",
//       color: state.isDisabled ? "#cbd5e1" : "#000000", // сірий колір для неактивних
//       cursor: state.isDisabled ? "not-allowed" : "pointer",
//       padding: "10px",
//       "&:hover": {
//         color: "rgba(102, 102, 102, 1)",
//       },
//     }),
//     menu: (provided) => ({
//       ...provided,
//       borderRadius: "0",
//     }),
//     menuPortal: (base) => ({ ...base, zIndex: 9999 }),

//     indicatorSeparator: () => ({
//       display: "none", // Прибирає лінію між текстом і стрілкою
//     }),
//   };

//   return ReactDOM.createPortal(
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.3, ease: "easeOut" }}
//       className={s.overlay}
//       onClick={onClose}
//       aria-labelledby="variation-popup"
//     >
//       <motion.div
//         initial={{ x: "-100%" }}
//         animate={{ x: 0 }}
//         exit={{ x: "-100%" }}
//         transition={{ duration: 0.3, ease: "easeOut" }}
//         className={s.popup}
//         onClick={(e) => e.stopPropagation()}
//         role="dialog"
//         aria-modal="true"
//       >
//         <div>
//           <div className={s.header}>
//             <h3 id="variation-popup">{t("variationPopup.select")}</h3>

//             <button onClick={() => onClose()}>
//               <svg
//                 viewBox="0 0 52 52"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M39 13L13 39M13 13L39 39"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </button>
//           </div>

//           {isLoading ? (
//             <Loader />
//           ) : (
//             <>
//               {uniqueAttributes.map((attribute) => {
//                 const options = [
//                   ...new Set(
//                     productVariations.flatMap((v) =>
//                       v.attributes
//                         .filter((a) => a.slug === attribute.slug)
//                         .map((a) => a.option)
//                     )
//                   ),
//                 ];

//                 const optionsList = options.map((option) => {
//                   const isValid = productVariations.some((variation) => {
//                     const matchesSelected = Object.entries(
//                       selectedAttributes
//                     ).every(([selectedSlug, selectedOption]) => {
//                       if (selectedSlug === attribute.slug) return true;
//                       return variation.attributes.some(
//                         (attr) =>
//                           attr.slug === selectedSlug &&
//                           attr.option === selectedOption
//                       );
//                     });

//                     const hasOption = variation.attributes.some(
//                       (attr) =>
//                         attr.slug === attribute.slug && attr.option === option
//                     );

//                     return matchesSelected && hasOption;
//                   });

//                   const optionImage =
//                     productVariations
//                       .filter((v) =>
//                         v.attributes.some(
//                           (a) =>
//                             a.slug === attribute.slug && a.option === option
//                         )
//                       )
//                       .map((v) => v.image?.src)[0] || "";

//                   return {
//                     value: option,
//                     label: option,
//                     image: optionImage,
//                     isDisabled: !isValid,
//                   };
//                 });

//                 return (
//                   <div key={attribute.slug} className={s.attribute}>
//                     <p className={s.title}>{attribute.name}</p>

//                     {attribute.slug === "pa_kolir" ? (
//                       <div className={s.select}>
//                         <Select
//                           options={optionsList.map((opt, index) => ({
//                             ...opt,
//                             label: (
//                               <div className="flex items-center">
//                                 {opt.image && (
//                                   <Image
//                                     src={opt.image}
//                                     alt={opt.label.toString()}
//                                     width={24}
//                                     height={24}
//                                     className="w-6 h-6 mr-2"
//                                   />
//                                 )}

//                                 {` 00${++index}, ${opt.label}`}
//                               </div>
//                             ),
//                           }))}
//                           value={optionsList.find(
//                             (opt) =>
//                               opt.value === selectedAttributes[attribute.slug]
//                           )}
//                           onChange={(option) =>
//                             option &&
//                             setSelectedAttributes((prev) => ({
//                               ...prev,
//                               [attribute.slug]: option.value,
//                             }))
//                           }
//                           className={s.select}
//                           styles={customStyles}
//                         />
//                       </div>
//                     ) : (
//                       <div className={s.volume}>
//                         {optionsList.map((opt) => (
//                           <label
//                             key={opt.value}
//                             className={`border cursor-pointer transition
//                 ${
//                   selectedAttributes[attribute.slug] === opt.value
//                     ? "border-black"
//                     : "border-gray-300"
//                 }
//                 ${opt.isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
//                           >
//                             <input
//                               type="radio"
//                               className="hidden"
//                               name={attribute.slug}
//                               value={opt.value}
//                               checked={
//                                 selectedAttributes[attribute.slug] === opt.value
//                               }
//                               onChange={() =>
//                                 setSelectedAttributes((prev) => ({
//                                   ...prev,
//                                   [attribute.slug]: opt.value,
//                                 }))
//                               }
//                               disabled={opt.isDisabled}
//                             />
//                             <div className="flex items-center">{opt.label}</div>
//                           </label>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </>
//           )}
//         </div>

//         <button
//           onClick={handleConfirm}
//           disabled={selectedVariation === null}
//           className={s.btn}
//         >
//           {t("variationPopup.apply")}
//           <svg
//             width="25"
//             height="24"
//             viewBox="0 0 25 24"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <g clipPath="url(#clip0_2700_10227)">
//               <path d="M17.9177 5L16.8487 6.05572L21.6059 10.7535H0.5V12.2465H21.6059L16.8487 16.9443L17.9177 18L24.5 11.5L17.9177 5Z" />
//             </g>
//             <defs>
//               <clipPath id="clip0_2700_10227">
//                 <rect width="24" height="24" transform="translate(0.5)" />
//               </clipPath>
//             </defs>
//           </svg>
//         </button>
//       </motion.div>
//     </motion.div>,
//     document.body
//   );
// };
