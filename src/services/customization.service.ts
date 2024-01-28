import customization from "@/store/customization.store";

const defaultFieldLength = 16;

const isFormValid = () => {
    const customizationStore = customization;
    const storeData = customizationStore.getStoreData();

    if (storeData.name === '' || storeData.surname === '' || storeData.birthdayDate === ''
        || storeData.name.length > defaultFieldLength || storeData.surname.length > defaultFieldLength) 
    {
      return false;
    } 
    return true;
};

export default isFormValid;