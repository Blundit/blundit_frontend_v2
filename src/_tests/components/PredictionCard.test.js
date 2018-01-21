import React from 'react';
import ReactDOM from 'react-dom';
import PredictionCard from './../../components/PredictionCard'

import { shallow } from 'enzyme'

it('PredictionCard: displays', () => {
  const component = shallow(<PredictionCard />)
  expect(component.length).toBe(1)
})

it('PredictionCard: title text displays if provided', () => {
  const component = shallow(<PredictionCard title="tester" />)
  const title = component.find('.prediction-card__title')

  expect(title.length).toBe(1)

  const titleText = component.find('.prediction-card__title-text')
  expect(titleText.text()).toEqual("tester")
})

it('PredictionCard: status displays if provided', () => {
  const component = shallow(<PredictionCard title="test" status="unknown" />)
  const title = component.find('.prediction-card__status--unknown')

  expect(title.length).toBe(1)
  expect(title.text()).toEqual("UNKNOWN")
})

it('PredictionCard: description displays properly', () => {
  const component = shallow(<PredictionCard description="This is the claim description" categories={[{id: "testing", name:"science"}]} />)
  const description = component.find('.prediction-card__description')
  const descriptionText = component.find('.prediction-card__description-text')
  const descriptionCategory = component.find('.prediction-card__description-category')

  expect(description.length).toBe(1)

  expect(descriptionText.length).toBe(1)
  expect(descriptionText.text()).toEqual("This is the claim description")

  expect(descriptionCategory.length).toBe(1)
  expect(descriptionCategory.find('.fa-home').length).toBe(1)
})

it('PredictionCard: expert info shows', () => {
  const component = shallow(<PredictionCard experts_agree={2} experts_disagree={10} />)
  const agree = component.find('.prediction-card__supporting__experts-agree')
  const disagree = component.find('.prediction-card__supporting__experts-disagree')

  expect(agree.length).toBe(1)
  expect(agree.text()).toBe("2")

  expect(disagree.length).toBe(1)
  expect(disagree.text()).toBe("10")
})

it('PredictionCard: expert info fallback to 0 if not provided', () => {
  const component = shallow(<PredictionCard />)
  const agree = component.find('.prediction-card__supporting__experts-agree')
  const disagree = component.find('.prediction-card__supporting__experts-disagree')

  expect(agree.length).toBe(1)
  expect(agree.text()).toBe("N/A")

  expect(disagree.length).toBe(1)
  expect(disagree.text()).toBe("N/A")
})

it('PredictionCard: evidence info shows', () => {
  const component = shallow(<PredictionCard evidence_for={2} evidence_against={10} />)
  const evidence_for = component.find('.prediction-card__supporting__evidence-for')
  const evidence_against = component.find('.prediction-card__supporting__evidence-against')

  expect(evidence_for.length).toBe(1)
  expect(evidence_for.text()).toBe("2")

  expect(evidence_against.length).toBe(1)
  expect(evidence_against.text()).toBe("10")
})

it('PredictionCard: evidence info fallback to 0 if not provided', () => {
  const component = shallow(<PredictionCard />)
  const evidence_for = component.find('.prediction-card__supporting__evidence-for')
  const evidence_against = component.find('.prediction-card__supporting__evidence-against')

  expect(evidence_for.length).toBe(1)
  expect(evidence_for.text()).toBe("N/A")

  expect(evidence_against.length).toBe(1)
  expect(evidence_against.text()).toBe("N/A")
})

it('PredictionCard: votes info shows', () => {
  const component = shallow(<PredictionCard status={1} voteable_at={new Date()} votes_yes={3} votes_unsure={9} votes_no={123} />)
  const votes_yes = component.find('.prediction-card__bottom__votes-yes')
  const votes_unsure = component.find('.prediction-card__bottom__votes-unsure')
  const votes_no = component.find('.prediction-card__bottom__votes-no')

  expect(votes_yes.length).toBe(1)
  expect(votes_yes.text()).toBe("3")

  expect(votes_unsure.length).toBe(1)
  expect(votes_unsure.text()).toBe("9")

  expect(votes_no.length).toBe(1)
  expect(votes_no.text()).toBe("123")
})

it('PredictionCard: votes info fallback to 0 if not provided', () => {
  const component = shallow(<PredictionCard status={1} voteable_at={new Date()} />)
  const votes_yes = component.find('.prediction-card__bottom__votes-yes')
  const votes_unsure = component.find('.prediction-card__bottom__votes-unsure')
  const votes_no = component.find('.prediction-card__bottom__votes-no')

  expect(votes_yes.length).toBe(1)
  expect(votes_yes.text()).toBe("N/A")

  expect(votes_unsure.length).toBe(1)
  expect(votes_unsure.text()).toBe("N/A")

  expect(votes_no.length).toBe(1)
  expect(votes_no.text()).toBe("N/A")
})

it('PredictionCard: meta info shows', () => {
  const component = shallow(<PredictionCard bookmarks_count={4} comments_count={9} />)
  const bookmarks = component.find('.prediction-card__bottom__meta-bookmarks')
  const comments = component.find('.prediction-card__bottom__meta-comments')

  expect(bookmarks.length).toBe(1)
  expect(bookmarks.text()).toBe("4")

  expect(comments.length).toBe(1)
  expect(comments.text()).toBe("9")
})

it('PredictionCard: meta info fallback to 0 if not provided', () => {
  const component = shallow(<PredictionCard />)
  const bookmarks = component.find('.prediction-card__bottom__meta-bookmarks')
  const comments = component.find('.prediction-card__bottom__meta-comments')

  expect(bookmarks.length).toBe(1)
  expect(bookmarks.text()).toBe("N/A")

  expect(comments.length).toBe(1)
  expect(comments.text()).toBe("N/A")
})

it('PredictionCard: voting bottom shows upcoming vote info', () => {
  const component = shallow(<PredictionCard voteable_at={new Date("2018-02-05")} status={0} />)
  const vote_in = component.find(".prediction-card__bottom__vote-in")
  expect(vote_in.length).toBe(1)

})

it('PredictionCard: voting bottom shows vote status if closed', () => {
  const component = shallow(<PredictionCard voteable_at={new Date("2017-01-01")} status={1} />)
  const vote_yes = component.find(".prediction-card__bottom__votes-yes")
  expect(vote_yes.length).toBe(1)
})

it('PredictionCard: voting bottom shows vote link if voting is active', () => {
  const component = shallow(<PredictionCard voteable_at={new Date("2018-01-05")} status={0} />)
  const vote_now = component.find(".prediction-card__bottom__vote-now")
  expect(vote_now.length).toBe(1)
})

it('PredictionCard: voting status shows empty if voting isnt yet open', () => {
  const component = shallow(<PredictionCard voteable_at={new Date("2033-01-07T00:00:00")} status={0} />)
  const status_open = component.find(".prediction-card__by-status--open")
  const status_closed = component.find(".prediction-card__by-status--closed")
  expect(status_open.length).toBe(0)
  expect(status_closed.length).toBe(0)
})

it('PredictionCard: voting status shows days left if voting is open', () => {
  const component = shallow(<PredictionCard voteable_at={new Date("2018-01-07T00:00:00")} status={0} />)
  const vote_now = component.find(".prediction-card__by-date")
  expect(vote_now.text()).toBe("January 7th, 2018")
})

it('PredictionCard: voting shows closed if voting is closed', () => {
  const component = shallow(<PredictionCard voteable_at={new Date("2017-01-07T00:00:00")} status={0} />)
  const status_open = component.find(".prediction-card__by-status--open")
  const status_closed = component.find(".prediction-card__by-status--closed")
  expect(status_open.length).toBe(0)
  expect(status_closed.length).toBe(1)
})