import { useRef, useContext } from "react";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import AddSection from "./Section/AddSection";
import classes from "./ResumeEditor.module.css";
import Experience from "./Experience/Experience";
import Toolbox from "./Toolbox/Toolbox";
import useResumeState from "../../hooks/use-resume-state";
import AppContext from "../../store/AppContext";
import Header from "./Header/Header";
import Section from "./Section/Section";
import AuthContext from "../../store/AuthContext";

const ResumeEditor: React.FC = () => {
    const {
        activeResumeId: ctxActiveResumeId,
        renameFile,
        deleteFile,
        downloadFile,
        togglePreview,
        areToolsActive,
    } = useContext(AppContext);

    const { userId } = useContext(AuthContext);

    const sectionRef = useRef<HTMLBaseElement>(null);

    const {
        resume,
        saveChanges,
        addHeaderInfo,
        addExperience,
        addSection,
        addItem,
        updateHeaderName,
        updateHeaderInfo,
        updateSectionName,
        updateExperienceName,
        updateExperienceDate,
        updateItemContent,
        updateItemOrder,
        deleteHeaderInfo,
        deleteSection,
        deleteExperience,
        deleteItem,
    } = useResumeState(sectionRef);

    return (
        <main className={classes.section} tabIndex={-1} ref={sectionRef}>
            {resume && (
                <>
                    <Toolbox
                        fileName={resume.name}
                        save={saveChanges}
                        copy={() => console.log("copy")}
                        download={() => {
                            if (ctxActiveResumeId) downloadFile();
                        }}
                        preview={() => {
                            if (ctxActiveResumeId) togglePreview();
                        }}
                        rename={(name) => {
                            if (ctxActiveResumeId && name && userId !== null)
                                renameFile(ctxActiveResumeId, name, userId);
                        }}
                        delete={() => {
                            if (ctxActiveResumeId && userId !== null) {
                                deleteFile(ctxActiveResumeId, userId);
                            }
                        }}
                    />
                    <Box sx={{ overflowY: "scroll", pt: "1rem", height: "calc(100% - 34px)"}}>
                        <Box
                            sx={{
                                p: "1rem",
                                m: "auto",
                                maxWidth: "816px",
                                minHeight: "100%",
                                border: "1px solid #eee",
                            }}
                        >
                            <Header
                                items={resume.header.items}
                                name={resume.header.name}
                                areToolsActive={areToolsActive}
                                addHeaderInfo={addHeaderInfo}
                                updateHeaderName={updateHeaderName}
                                updateHeaderInfo={updateHeaderInfo}
                                deleteHeaderInfo={deleteHeaderInfo}
                            />

                            <Divider />

                            {resume?.sections.map((section, idx) => (
                                <Section
                                    key={`${section.id}-${idx}`}
                                    name={section.name}
                                    id={section.id}
                                    areToolsActive={areToolsActive}
                                    updateSectionName={updateSectionName}
                                    deleteSection={deleteSection}
                                    addExperience={addExperience}
                                >
                                    <>
                                        {section.items.map(
                                            (experience, idx) => (
                                                <Experience
                                                    key={`${experience.id}-${idx}`}
                                                    id={experience.id}
                                                    sectionId={section.id}
                                                    title={experience.name}
                                                    items={
                                                        experience.items || []
                                                    }
                                                    startDate={
                                                        experience.startDate
                                                    }
                                                    endDate={experience.endDate}
                                                    areToolsActive={
                                                        areToolsActive
                                                    }
                                                    addItem={addItem}
                                                    updateExperienceName={
                                                        updateExperienceName
                                                    }
                                                    updateExperienceDate={
                                                        updateExperienceDate
                                                    }
                                                    updateItemContent={
                                                        updateItemContent
                                                    }
                                                    updateItemOrder={
                                                        updateItemOrder
                                                    }
                                                    deleteItem={deleteItem}
                                                    deleteExperience={
                                                        deleteExperience
                                                    }
                                                />
                                            )
                                        )}
                                    </>
                                </Section>
                            ))}

                            {areToolsActive && (
                                <AddSection addSection={addSection} />
                            )}
                        </Box>
                    </Box>
                </>
            )}
        </main>
    );
};

export default ResumeEditor;
