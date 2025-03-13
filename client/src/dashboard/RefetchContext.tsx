import React, { createContext, useContext, useCallback } from 'react';

interface RefetchContextType {
    refetchTransactions: () => Promise<void>;
}

const RefetchContext = createContext<RefetchContextType | undefined>(undefined);

export const RefetchProvider = ({ children, refetchTransactions }: { children: React.ReactNode, refetchTransactions: () => Promise<void> }) => {
    return (
        <RefetchContext.Provider value={{ refetchTransactions }}>
            {children}
        </RefetchContext.Provider>
    );
};

export const useRefetch = () => {
    const context = useContext(RefetchContext);
    if (!context) {
        throw new Error('useRefetch must be used within a RefetchProvider');
    }
    return context;
};