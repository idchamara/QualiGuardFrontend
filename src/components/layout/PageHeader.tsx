import React, { Fragment } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
interface Breadcrumb {
  label: string;
  href?: string;
}
interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
}
export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions
}: PageHeaderProps) {
  return <div className="mb-8">
      {breadcrumbs && <nav className="flex items-center text-sm text-gray-500 mb-4">
          {breadcrumbs.map((item, index) => <Fragment key={index}>
              {index > 0 && <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />}
              {item.href ? <Link to={item.href} className="hover:text-blue-600 transition-colors">
                  {item.label}
                </Link> : <span className="font-medium text-gray-900">{item.label}</span>}
            </Fragment>)}
        </nav>}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            {title}
          </h1>
          {description && <p className="mt-2 text-gray-600">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>;
}