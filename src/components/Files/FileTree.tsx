import React, { useState } from "react";
import { TreeNode, ITreeNode } from "./FileNode";

const initialTree: ITreeNode = {
  id: 1,
  name: "root",
  isFolder: true,
  children: [
    { id: 2, name: "file1.tex" },
    { id: 3, name: "file2.tex" },
    {
      id: 4,
      name: "folder1",
      isFolder: true,
      children: [{ id: 5, name: "file3.tex" }],
    },
  ],
};

const TreeFile: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<ITreeNode | null>(null);

  const handleNodeClick = (node: ITreeNode) => {
    setSelectedNode(node);
  };

  return (
    <div className="bg-blue-100 rounded shadow min-h-screen p-4">
      <TreeNode
        node={initialTree}
        level={0}
        selectedNode={selectedNode}
        onNodeClick={handleNodeClick}
      />
      {selectedNode && (
        <div className="mt-4 text-blue-500">Selected: {selectedNode.name}</div>
      )}
    </div>
  );
};

export default TreeFile;
