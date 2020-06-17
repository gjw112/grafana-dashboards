import React, {
  FC, useContext, useEffect, useRef, useState
} from 'react';
import containerStyling from 'shared/components/helpers/styling';
import SplitPane from 'react-split-pane';
import { QueryAnalyticsProvider, UrlParametersProvider } from './provider/provider';
import {
  Overview, Filters, Details, ManageColumns
} from './components';
import { styles } from './panel.styles';
import 'shared/styles.scss';
import 'shared/style.less';
import './panel.scss';

const QueryAnalyticsPanel: FC = () => {
  useEffect(() => containerStyling.addPluginPanelClass(), []);
  const {
    panelState: { querySelected },
  } = useContext(QueryAnalyticsProvider);
  // TODO: replace with something more elegant & fast
  const queryAnalyticsWrapper = useRef<HTMLDivElement>(null);
  const size = queryAnalyticsWrapper.current?.clientWidth;

  const [, setReload] = useState<object>({});

  useEffect(() => {
    setReload({});
  }, [querySelected]);

  return (
    <div className="query-analytics-grid" id="antd" ref={queryAnalyticsWrapper}>
      <div className="overview-filters">
        <Filters />
      </div>
      <div className="query-analytics-data">
        <div className={styles.getContainerWrapper(size)}>
          <div className={styles.overviewHeader}>
            <div className={styles.manageColumnsWrapper}>
              <ManageColumns onlyAdd />
            </div>
          </div>
          <div className={styles.splitterWrapper}>
            <SplitPane
              split="horizontal"
              onDragFinished={() => setReload({})}
              className={styles.splitterWrapper}
              resizerStyle={{ display: querySelected ? '' : 'none' }}
              pane1Style={{
                minHeight: querySelected ? '20%' : '100%',
                maxHeight: querySelected ? '60%' : '100%',
              }}
              pane2Style={{ minHeight: '20%', overflowY: 'scroll', zIndex: 999 }}
            >
              <Overview />
              <div>{querySelected ? <Details /> : null}</div>
            </SplitPane>
          </div>
        </div>
      </div>
    </div>
  );
};

export default (props) => (
  <UrlParametersProvider grafanaProps={props}>
    <QueryAnalyticsPanel />
  </UrlParametersProvider>
);
