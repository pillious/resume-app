import { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import DebouncedTextarea from "../../UI/DebouncedTextarea";
import Info from "./Info";
import { guid, IItem } from "../../../types";
import HeaderButtonGroup from "./HeaderButtonGroup";
import { sortByOrder } from "../../../utils/utils";
import { useTheme } from "@mui/material";

interface IProps {
    name: string;
    items: IItem[];
    areToolsActive: boolean;
    addHeaderInfo: () => void;
    updateHeaderName: (name: string) => void;
    updateHeaderInfo: (itemId: guid, content: string) => void;
    deleteHeaderInfo: (itemId: guid) => void;
}

const Header: React.FC<IProps> = ({
    name,
    items,
    areToolsActive,
    updateHeaderName,
    updateHeaderInfo,
    addHeaderInfo,
    deleteHeaderInfo,
}) => {
    const theme = useTheme();

    const [info, setInfo] = useState<JSX.Element[]>([]);
    const addInfo = useCallback(
        (item: IItem) => {
            setInfo((prev) => [
                ...prev,
                <Info
                    key={item.id}
                    placeholder="Personal info"
                    defaultValue={item.content ?? ""}
                    onChange={(value: string) => {
                        updateHeaderInfo(item.id, value);
                    }}
                />,
            ]);
        },
        [updateHeaderInfo]
    );

    useEffect(() => {
        setInfo([]);
        sortByOrder<IItem>(items).forEach((item) => addInfo(item));
    }, [items, addInfo]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 0.5,
                mb: 1,
            }}
        >
            <Box
                sx={{
                    width: "max(200px, 40%)",
                    "& input": {
                        textAlign: "center",
                    },
                }}
            >
                <DebouncedTextarea
                    sx={{
                        fontSize: "1.25rem",
                        fontWeight: "600",
                        width: "100%",
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        "&:hover": {
                            backgroundColor: theme.palette.overlay,
                        },
                        "& input": { textAlign: "center" },
                    }}
                    defaultValue={name}
                    placeholder="Name"
                    multiline={false}
                    onChange={(value: string) => updateHeaderName(value)}
                />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "0.25rem",
                    py: "0.5rem",
                }}
            >
                {[...info]}
                {areToolsActive && (
                    <HeaderButtonGroup
                        addHeaderInfo={addHeaderInfo}
                        deleteHeaderInfo={() =>
                            deleteHeaderInfo(items[items.length - 1].id)
                        }
                    />
                )}
            </Box>
        </Box>
    );
};

export default Header;
