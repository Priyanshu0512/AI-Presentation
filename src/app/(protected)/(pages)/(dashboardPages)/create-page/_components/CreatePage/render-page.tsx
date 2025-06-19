"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import usePromptStore from "@/store/usePromptStore";
import CreatePage from "./create-page";
import CreateAI from "./GenerateAI/createAI";

const RenderPage = () => {
  const router = useRouter();

  const { page, setPage } = usePromptStore();

  const handleSelectOption = (option: string) => {
    if (option === "template") {
      router.push("/templates");
    } else if (option === "create-scratch") {
      setPage("create-scratch");
    } else {
      setPage("creative-ai");
    }
  };

  const handleBack = () => {
    setPage("create");
  };

  const renderStep = () => {
    console.log(page);
    switch (page) {
      case "create":
        return <CreatePage onSelectOption={handleSelectOption} />;
      case "create-scratch":
        return <>2</>;
      case "creative-ai":
        return <CreateAI onBack={handleBack} />;
      default:
        return null;
    }
  };
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={page}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderStep()}
      </motion.div>
    </AnimatePresence>
  );
};

export default RenderPage;
