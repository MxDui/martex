import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
export interface ITreeNode {
  id: number;
  name: string;
  children?: ITreeNode[];
  isFolder?: boolean;
}

interface TreeNodeProps {
  node: ITreeNode;
  level: number;
  selectedNode: ITreeNode | null;
  onNodeClick: (node: ITreeNode) => void;
  onNodeAdd: (parentId: number, node: Omit<ITreeNode, "id">) => void;
}

export const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  level,
  selectedNode,
  onNodeClick,
  onNodeAdd,
}) => {
  const [adding, setAdding] = useState(false);
  const [newNodeName, setNewNodeName] = useState("");
  const [newNodeType, setNewNodeType] = useState<"file" | "folder">("file");

  const handleAddClick = () => {
    setAdding(true);
  };

  const handleAddConfirm = () => {
    onNodeAdd(node.id, {
      name: newNodeName,
      isFolder: newNodeType === "folder",
      children: newNodeType === "folder" ? [] : undefined,
    });
    setNewNodeName("");
    setAdding(false);
  };

  return (
    <div
      className={`pl-${level} p-2 cursor-pointer hover:bg-blue-100 rounded 
                ${selectedNode?.id === node.id ? "shadow-lg bg-blue-100" : ""}`}
      onClick={() => onNodeClick(node)}
    >
      {node.isFolder ? <b className="text-blue-500">{node.name}</b> : node.name}
      {node.isFolder && (
        <PlusIcon
          className="h-5 w-5 ml-2 text-blue-500"
          onClick={handleAddClick}
        />
      )}
      {adding && (
        <div>
          <input
            type="text"
            placeholder="Enter name"
            value={newNodeName}
            onChange={(e) => setNewNodeName(e.target.value)}
          />
          <select
            value={newNodeType}
            onChange={(e) =>
              setNewNodeType(e.target.value as "file" | "folder")
            }
          >
            <option value="file">File</option>
            <option value="folder">Folder</option>
          </select>
          <button onClick={handleAddConfirm}>Add</button>
        </div>
      )}
      {node.children?.map((childNode) => (
        <TreeNode
          key={childNode.id}
          node={childNode}
          level={level + 1}
          selectedNode={selectedNode}
          onNodeClick={onNodeClick}
          onNodeAdd={onNodeAdd}
        />
      ))}
    </div>
  );
};
