
import { useState, useContext, createContext} from "react";

export const CreateRecipeContext = createContext();

export default function CreateRecipeProvider({children}) {
    const [showFirstStage, setShowFirstStage] = useState(false);
    const [showSecondStage, setShowSecondStage] = useState(false);
    const [showThirdStage, setShowThirdStage] = useState(false);
    const [showFourthStage, setShowFourthStage] = useState(false);

    const hideAll = () => {
        setShowFirstStage(false);
        setShowSecondStage(false);
        setShowThirdStage(false);
        setShowFourthStage(false);
    }

    const values = {
        showFirstStage: showFirstStage,
        setShowFirstStage: setShowFirstStage,
        showSecondStage: showSecondStage,
        setShowSecondStage: setShowSecondStage,
        showThirdStage: showThirdStage,
        setShowThirdStage: setShowThirdStage,
        showFourthStage: showFourthStage,
        setShowFourthStage: setShowFourthStage,
        hideAll: hideAll
    };

    return (
        <CreateRecipeContext.Provider value={values}>
            {children}
        </CreateRecipeContext.Provider>
    )
}