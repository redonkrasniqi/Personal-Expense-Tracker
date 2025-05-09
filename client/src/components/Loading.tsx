import { Spin } from "antd";

const contentStyle: React.CSSProperties = {
    padding: 50,
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
};

export default function Loading() {
    const content = <div style={contentStyle} />;

    return (
        <Spin tip="Loading" size="large">
            {content}
        </Spin>
    );
}