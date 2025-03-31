import React, { useEffect, useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

interface CheckListItem {
  id: string;
  text: string;
  checked: boolean;
}

export default function App() {
  const [items, setItems] = useState<CheckListItem[]>([]);
  const [reloaded, setReloaded] = useState<boolean>(false);

  const addItem = () => {
    const newItem: CheckListItem = {
      id: Date.now().toString(),
      text: '',
      checked: false
    };
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    localStorage.setItem('checklist-items', JSON.stringify(updatedItems));
  };

  const deleteItem = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem('checklist-items', JSON.stringify(updatedItems));
  };

  const updateItem = (id: string, updates: Partial<CheckListItem>) => {
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, ...updates } : item
    );
    setItems(updatedItems);
    localStorage.setItem('checklist-items', JSON.stringify(updatedItems));
  };

  useEffect(() => {
    const localItemsJsonString = localStorage.getItem('checklist-items') ?? '';
    let localItems: CheckListItem[] = [];
    if (localItemsJsonString) {
      localItems = JSON.parse(localItemsJsonString);
    }
    if (localItems) {
      setItems(localItems);
    }
  }, []);

  useEffect(() => {
    if (items.length === 0 || reloaded) {
      return;
    }

    var itemTexts = document.getElementsByTagName('textarea');
    // for (let i = 0; i < itemTexts.length; i++) {
    //   itemTexts[i].innerHTML = '';
    // }
    for (let i = 0; i < itemTexts.length; i++) {
      if (items[i]) {
        // itemTexts[i].innerHTML = items[i].text;
        itemTexts[0].style.height = `${itemTexts[0].scrollHeight}px`;
      }
    }
    setReloaded(true);
  }, [items, reloaded]);


  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">CHECK List</h1>
          {
          // <button
          //   onClick={addItem}
          //   className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
          //   aria-label="Add new item"
          // >
          //   <PlusCircle size={24} />
          // </button>
          }
        </div>

        <div className="space-y-3">
          {items.map(item => (
            <div
              key={item.id}
              className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm min-h-auto"
              style={{ padding: '0.5em 1.0em', height: 'auto' }}
            >
              <input
                type="checkbox"
                checked={item.checked}
                onChange={(e) => updateItem(item.id, { checked: e.target.checked })}
                className="mt-1.5 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <textarea
                value={item.text}
                onChange={(e) => updateItem(item.id, { text: e.target.value })}
                placeholder={items.indexOf(item) === 0
                  ? "Enter your thing here..."
                  : items.indexOf(item) === 1
                    ? "Enter more thing here..."
                    : items.indexOf(item) === 2
                      ? "Wow, you're getting a few..."
                      : items.indexOf(item) === 3
                        ? "Slow down... perhaps!?"
                        : items.indexOf(item) === 4
                          ? "Holy cow!!! You're serious!"
                          : items.indexOf(item) === 5
                            ? "I'm watching, you know?"
                            : items.indexOf(item) === 6
                              ? "I can't watch anymore 😭"
                              : "@$&^**+!😵‍💫"
                }
                rows={1}
                className="flex-1 resize-none overflow-hidden bg-transparent p-0 focus:ring-0 focus:outline-none"
                style={{
                  overflow: 'auto',
                  height: 'auto',
                  minHeight: '24px'
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = target.scrollHeight + 'px';
                }}
              />
              <button
                onClick={() => deleteItem(item.id)}
                className="p-1 text-red-500 hover:text-red-700 transition-colors"
                aria-label="Delete item"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addItem}
          className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
          aria-label="Add new item"
        >
          <PlusCircle size={24} />
        </button>
      </div>
    </div>
  );
}