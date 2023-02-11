import path from 'path';
import store, { AppDispatch } from '../src/store';
import { GraderActionType } from '../src/store/actions-types/grader';
import { ScannerActionType } from '../src/store/actions-types/scanner';
import { gradeImage } from '../src/utils/common';
import { loadImageToBase64 } from './utils/common';

describe('Image Scanner', () => {
  let dispatch: AppDispatch;

  beforeAll(async () => {
    dispatch = store.dispatch;
  });

  it('Can push a new image data to the store', async () => {
    dispatch({
      type: ScannerActionType.PUSH_IMAGE,
      payload: {
        initialImage: path.resolve(__dirname, 'images/img-A-45.jpg'),
        croppedImage: await loadImageToBase64('images/img-A-45.jpg'),
      },
    });

    expect(store.getState().scanner.images.length).toBe(1);
  });

  it('Can update already existed image to the store', async () => {
    dispatch({
      type: ScannerActionType.UPDATE_IMAGE,
      payload: {
        index: 0,
        data: {
          initialImage: path.resolve(__dirname, 'images/img-A-292.jpg'),
          croppedImage: await loadImageToBase64('images/img-A-45.jpg'),
        },
      },
    });

    expect(
      store.getState().scanner.images[0].initialImage.includes('A-292')
    ).toBe(true);
  });

  it('Can delete already existed image to the store', async () => {
    dispatch({
      type: ScannerActionType.DELETE_IMAGE,
      payload: 0,
    });

    expect(store.getState().scanner.images.length).toBe(0);
  });

  it('Can load image to grade to the store', async () => {
    dispatch({
      type: GraderActionType.PUSH_INPUT,
      payload: {
        image: await loadImageToBase64('images/img-A-45.jpg'),
      },
    });

    expect(store.getState().grader.input.length).toBe(1);
  });

  it('Can grade image using api', async () => {
    const [grade, err] = await gradeImage(
      store.getState().grader.input[0].image
    );

    expect(grade?.score).toBeDefined();
  });

  it('Can store grade result from api to store', async () => {
    dispatch({
      type: GraderActionType.PUSH_INPUT,
      payload: {
        image: await loadImageToBase64('images/img-AB-83.jpg'),
      },
    });

    const [grade, err] = await gradeImage(
      store.getState().grader.input[1].image
    );

    if (!grade) return;

    dispatch({
      type: GraderActionType.PUSH_OUTPUT,
      payload: grade,
    });

    expect(store.getState().grader.output.length).toBe(1);
  });
});
