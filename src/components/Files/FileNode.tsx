import React from "react";

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
}

export const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  level,
  selectedNode,
  onNodeClick,
}) => (
  <div
    className={`pl-${level} p-2 cursor-pointer hover:bg-blue-100 rounded 
                ${selectedNode?.id === node.id ? "shadow-lg bg-blue-100" : ""}`}
    onClick={() => onNodeClick(node)}
  >
    {node.isFolder ? <b className="text-blue-500">{node.name}</b> : node.name}
    {node.children?.map((childNode) => (
      <TreeNode
        key={childNode.id}
        node={childNode}
        level={level + 1}
        selectedNode={selectedNode}
        onNodeClick={onNodeClick}
      />
    ))}
  </div>
);
