import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import NoMatch from './NoMatch';
import ChapterHome from './ChapterHome';
import Question from './Question';
import NoQuestions from './NoQuestions';
import { ScoreContext } from '../score-context';

class ChapterRouter extends Component {
  render() {
    const { chapter, bookUrl, bookId, chapterId } = this.props;

    let displayQuestions;
    let chapterPath = bookUrl + chapter.url;

    if (chapter.questions) {
      displayQuestions = chapter.questions.map((question, index) => {
        let questionPath = chapterPath + '/q' + (index + 1);

        return (
          <Route
            key={questionPath}
            path={questionPath}
            render={() => (
              <ScoreContext.Consumer>
                {({ score, updateScore }) => (
                  <Question
                    bookId={bookId}
                    chapterId={chapterId}
                    baseUrl={chapterPath}
                    index={index + 1}
                    question={question}
                    numberOfQuestions={chapter.questions.length}
                    score={score}
                    updateScore={updateScore}
                  />
                )}
              </ScoreContext.Consumer>
            )}
          />
        );
      });
    } else {
      displayQuestions = <NoQuestions />;
    }

    return (
      <div>
        <Link
          style={{ textDecoration: 'none', color: 'black' }}
          to={chapterPath}
        >
          <h3 style={{ fontSize: '24px' }}>{chapter.title}</h3>
          <h6>
            More information here:
            <a href={chapter.chapterLink}> GitHub link to the chapter</a>
          </h6>
        </Link>
        <Switch>
          <Route
            exact
            path={chapterPath}
            render={() => {
              return <ChapterHome currentUrl={chapterPath} />;
            }}
          />
          {displayQuestions}
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default ChapterRouter;
