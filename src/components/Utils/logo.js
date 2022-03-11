import React from 'react';
import bn from '../../lib/utils/bemnames';

const bem = bn.create('sidebar');
const Logo = () => (
    <div>
        <span className={bem.e('textone')}>ADMIN</span><span className={bem.e('texttwo')}>  DY</span>
    </div>
)



export default Logo;
