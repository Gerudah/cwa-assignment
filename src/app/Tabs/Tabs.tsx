import React, { useState, useEffect } from 'react';
import style from './Tabs.module.css'
// Define a type for our tab object for better type safety
interface Tab {
    id: number;
    label: string;
    content: string;
}

//This Page Contains AI generated code

const Tabs = () => {
    // State for the list of tabs
    const [tabs, setTabs] = useState<Tab[]>([]);
   
    const [activeTabId, setActiveTabId] = useState<number | null>(null);
    
    const [newTabLabel, setNewTabLabel] = useState('');
    
    const [newTabContent, setNewTabContent] = useState('');
    
    const [generatedHtml, setGeneratedHtml] = useState('');

    // Function to add a new tab
    const handleAddTab = () => {
        
        if (newTabLabel.trim() === '') {
            alert('Tab label cannot be empty.');
            return;
        }

        const newTab: Tab = {
            id: Date.now(), // Using timestamp for a more reliable unique ID
            label: newTabLabel,
            content: newTabContent,
        };

        const newTabs = [...tabs, newTab];
        setTabs(newTabs);
        setActiveTabId(newTab.id); // Make the new tab active

        // Clear input fields
        setNewTabLabel('');
        setNewTabContent('');
    };

    // Function to remove a tab
    const handleRemoveTab = (tabIdToRemove: number) => {
        const updatedTabs = tabs.filter(tab => tab.id !== tabIdToRemove);
        setTabs(updatedTabs);

        // If the active tab is the one being removed, update the active tab
        if (activeTabId === tabIdToRemove) {
            if (updatedTabs.length > 0) {
                // Set the new active tab to be the first one in the list
                setActiveTabId(updatedTabs[0].id);
            } else {
                // No tabs left
                setActiveTabId(null);
            }
        }
    };

    // Function to handle tab selection
    const handleSelectTab = (tabId: number) => {
        setActiveTabId(tabId);
    };

    // Find the currently active tab object
    const activeTab = tabs.find(tab => tab.id === activeTabId);

    // Function to generate static HTML for the tabs
    const generateHtmlForTabs = (tabsToRender: Tab[], currentActiveId: number | null): string => {
        if (tabsToRender.length === 0) {
            return '<!-- Add some tabs to generate HTML -->';
        }

        const tabButtons = tabsToRender.map(tab =>
            `        <button class="tab-button${tab.id === currentActiveId ? ' active' : ''}" data-tab-id="${tab.id}">${tab.label}</button>`
        ).join('\n');

        const tabContents = tabsToRender.map(tab =>
            `        <div class="tab-content${tab.id === currentActiveId ? ' active' : ''}" id="content-${tab.id}">${tab.content}</div>`
        ).join('\n');

        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Tabs</title>
    <style>
        body { font-family: sans-serif; padding: 20px; }
        .tab-bar {
            border-bottom: 2px solid #ccc;
            display: flex;
            flex-wrap: wrap;
        }
        .tab-button {
            padding: 10px 20px;
            border: none;
            cursor: pointer;
            background-color: transparent;
            border-bottom: 3px solid transparent;
            font-size: 1rem;
            outline: none;
        }
        .tab-button.active {
            border-bottom-color: #2196f3;
            font-weight: bold;
        }
        .tab-content-wrapper {
            border: 1px solid #ddd;
            border-top: none;
            padding: 20px;
            border-radius: 0 0 8px 8px;
            min-height: 100px;
        }
        .tab-content { display: none; }
        .tab-content.active { display: block; }
    </style>
</head>
<body>
    <div class="tab-bar">
${tabButtons}
    </div>
    <div class="tab-content-wrapper">
${tabContents}
    </div>
    <script>
        document.querySelector('.tab-bar').addEventListener('click', (e) => {
            if (e.target.matches('.tab-button')) {
                const tabId = e.target.dataset.tabId;
                document.querySelectorAll('.tab-button, .tab-content').forEach(el => el.classList.remove('active'));
                e.target.classList.add('active');
                document.getElementById('content-' + tabId)?.classList.add('active');
            }
        });
    </script>
</body>
</html>`;
        return html;
    };

    
    useEffect(() => {
        const html = generateHtmlForTabs(tabs, activeTabId);
        setGeneratedHtml(html);
    }, [tabs, activeTabId]);

    return (
        <div className={style.card}>
            <div
                style={{
                    textAlign: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginBottom: '20px',
                }}
            >
                Dynamic Tabs Component
            </div>

            {/* Form for adding a new tab */}
            <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
                <input
                    style={{
                        fontSize: '1rem',
                        padding: '10px',
                        marginRight: '10px',
                        width: 'calc(50% - 25px)',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                    }}
                    placeholder="New tab label..."
                    value={newTabLabel}
                    onChange={(e) => setNewTabLabel(e.target.value)}
                />
                <textarea
                    style={{ fontSize: '1rem', padding: '10px', width: 'calc(50% - 25px)', borderRadius: '4px', border: '1px solid #ccc', verticalAlign: 'top' }}
                    placeholder="New tab content..."
                    value={newTabContent}
                    onChange={(e) => setNewTabContent(e.target.value)}
                    rows={1}
                />
                <button
                    style={{
                        fontSize: '1rem',
                        padding: '10px 20px',
                        backgroundColor: 'purple',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        marginTop: '0.5rem'
                    }}
                    onClick={handleAddTab}
                >
                    Add Tab
                </button>
            </div>

            {/* Tab Headers */}
            <div style={{ borderBottom: '2px solid #ccc', display: 'flex', flexWrap: 'wrap' }}>
                {tabs.map(tab => (
                    <div key={tab.id} style={{ display: 'flex', alignItems: 'center' }}>
                        <button
                            style={{
                                padding: '10px 20px',
                                border: 'none',
                                borderBottom: activeTabId === tab.id ? '3px solid #2196f3' : '3px solid transparent',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                fontWeight: activeTabId === tab.id ? 'bold' : 'normal'
                            }}
                            onClick={() => handleSelectTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                        <button
                            style={{ marginLeft: '-5px', padding: '2px 5px', border: 'none', background: 'transparent', cursor: 'pointer', color: '#912', fontWeight: 'bold' }}
                            onClick={() => handleRemoveTab(tab.id)}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            {/* Tab Content */}
            <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', minHeight: '100px' }}>
                {activeTab ? (
                    <div>{activeTab.content}</div>
                ) : (
                    <div style={{ textAlign: 'center', color: '#777' }}>
                        {tabs.length > 0 ? 'Select a tab to see its content.' : 'No tabs to display. Add one above!'}
                    </div>
                )}
            </div>

            <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', minHeight: '20rem', overflow: 'auto' }}>
                <h3 style={{ marginTop: 0, borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>Copyable HTML Output</h3>
                <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', margin: 0, fontSize: '0.8rem' }}>
                    <code>
                        {generatedHtml}
                    </code>
                </pre>
            </div>
        </div>
    );
};

export default Tabs;