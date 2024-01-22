import clsx from 'clsx';
import { Button } from 'components/button';
import { MoreHorizontal } from 'lucide-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const HeaderPostUser = ({ img, name, href, action, className }) => {
    return (
        <div className={clsx('px-3 flex justify-between', className)}>
            <div className='w-max h-full flex items-center gap-3'>
                <div className='w-30 h-2/3'>
                    <img
                        loading="lazy"
                        alt="img"
                        className="object-fill w-full h-full rounded-full"
                        src={img ? img : 'https://github.com/shadcn.png'}
                    />
                </div>

                <Button variant="link">
                    <Link to={href}>
                        <p className='text-lg font-nunito_sans text-black dark:text-white font-bold'>
                            {name ? name : 'User'}
                        </p>
                    </Link>
                </Button>
            </div>

            <div className='h-full flex items-center'>
                {
                    action ? action : <MoreHorizontal size={20} strokeWidth={1.25} />
                }
            </div>
        </div>
    )
}

HeaderPostUser.propTypes = {
    img: PropTypes.string,
    name: PropTypes.string,
    href: PropTypes.string,
    action: PropTypes.node,
    className: PropTypes.string,
}

export default HeaderPostUser
