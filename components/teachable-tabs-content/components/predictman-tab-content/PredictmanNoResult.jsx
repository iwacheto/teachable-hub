import React from 'react';
import Style from './predictman-no-result.module.scss';
import Link from 'next/link';
import Button from '../../../form-elements/button/Button';

const PredictmanNoResult = ({ data }) => {
    const link = data ? `/${data?.owner?.handler}/${data?.name}/docs` : null;
    
    return <div className={Style.no_result}>
        <h3 className={Style.heading}>You should have at least one verified deployment to make a prediction!</h3>
        <p className={Style.subheading}>
            Be a superhero and learn
            {link && <Link href={link}>
                <a className={Style.link}> how to create your first deployment </a>
            </Link>}
            now
        </p>
        <div>
            <Button
                styleClass="primary-button"
            >
                {link && <Link href={link}>
                    <a>Create new Deployment</a>
                </Link>}
            </Button>
        </div>
    </div>
}

export default PredictmanNoResult