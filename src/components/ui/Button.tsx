import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
    href: string;
    children: ReactNode;
    variant?: 'default' | 'full';
    className?: string;
    style?: React.CSSProperties;
}

export default function Button({ href, children, variant = 'default', className = '', style }: ButtonProps) {
    const baseClass = 'btn';
    const variantClass = variant === 'full' ? 'btn-full' : '';

    return (
        <Link href={href} className={`${baseClass} ${variantClass} ${className}`} style={style}>
            {children}
        </Link>
    );
}
